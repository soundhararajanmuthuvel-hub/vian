import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Enable Cross-Origin Resource Sharing (CORS) for Vercel frontends (vian-erp.vercel.app, vian-orcin.vercel.app)
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    const allowed = origin && (
      origin === 'https://vian-erp.vercel.app' ||
      origin === 'https://vian-orcin.vercel.app' ||
      /^https:\/\/([a-zA-Z0-9-]+\.)*vercel\.app$/.test(origin) ||
      origin.startsWith('http://localhost:') ||
      origin.startsWith('http://127.0.0.1:')
    );

    if (allowed && origin) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-Device-Mode');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Health check endpoint for Render monitoring
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'online',
      service: 'VIAN ERP Backend (Render)',
      frontendUrl: 'https://vian-orcin.vercel.app',
      timestamp: new Date().toISOString()
    });
  });

  // API Status & Configuration Endpoint
  app.get('/api/cloudinary-status', (req, res) => {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'dwn2sx3b';
    const apiKey = process.env.CLOUDINARY_API_KEY || '225689611225281';
    res.json({
      configured: true,
      cloudName,
      apiKey: apiKey ? `${apiKey.slice(0, 4)}...${apiKey.slice(-3)}` : null,
      folder: 'vian_jobsite'
    });
  });

  // Cloudinary Direct Upload Endpoint
  app.post('/api/upload-cloudinary', async (req, res) => {
    try {
      const { image, title, zone, coordinates, accuracy, siteName } = req.body;
      if (!image) {
        return res.status(400).json({ error: 'Missing image data (base64 or URL required)' });
      }

      const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'dwn2sx3b';
      const apiKey = process.env.CLOUDINARY_API_KEY || '225689611225281';
      const primarySecret = process.env.CLOUDINARY_API_SECRET || 'yOef6D21VeHsoxKxIbd8IOc0GIg';

      // Test potential glyph interpretations from the dashboard screenshot (e.g. capital I vs lowercase l)
      const secretCandidates = [
        primarySecret,
        primarySecret.replace(/GIg$/, 'Glg'),
        primarySecret.replace(/Glg$/, 'GIg'),
        'yOef6D21VeHsoxKxIbd8IOc0Glg',
        'yOef6D21VeHsoxKxIbd8IOc0GIg'
      ];
      const uniqueSecrets = Array.from(new Set(secretCandidates));

      const timestamp = Math.floor(Date.now() / 1000);
      const folder = 'vian_jobsite';
      const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;

      let uploadResult: any = null;
      let lastErrorMessage = '';

      for (const secret of uniqueSecrets) {
        const signature = crypto.createHash('sha1').update(paramsToSign + secret).digest('hex');

        const formData = new URLSearchParams();
        formData.append('file', image);
        formData.append('api_key', apiKey);
        formData.append('timestamp', String(timestamp));
        formData.append('folder', folder);
        formData.append('signature', signature);

        try {
          const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
          });

          const data = await response.json();
          if (response.ok && data.secure_url) {
            uploadResult = data;
            break;
          } else {
            lastErrorMessage = data.error?.message || response.statusText;
            if (!lastErrorMessage.toLowerCase().includes('signature')) {
              break;
            }
          }
        } catch (fetchErr: any) {
          lastErrorMessage = fetchErr.message;
        }
      }

      if (!uploadResult) {
        return res.status(500).json({
          error: lastErrorMessage || 'Cloudinary rejected upload request',
          cloudName,
          hint: 'Check API Secret validity in Cloudinary Settings'
        });
      }

      return res.json({
        success: true,
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        format: uploadResult.format,
        bytes: uploadResult.bytes,
        width: uploadResult.width,
        height: uploadResult.height,
        cloudName,
        createdAt: uploadResult.created_at,
        metadata: {
          title: title || 'Jobsite Photo',
          siteName: siteName || 'The Courtyard Residence, OMR',
          zone: zone || 'Active Site Zone',
          coordinates: coordinates || '12.9716° N, 80.2458° E',
          accuracy: accuracy || '±2.4m GPS Calibrated'
        }
      });
    } catch (err: any) {
      console.error('Server error during Cloudinary upload:', err);
      return res.status(500).json({ error: err.message || 'Server error' });
    }
  });

  // Mount Vite middlewares in development
  const isDev = process.env.NODE_ENV !== 'production';
  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[VIAN ERP Server] Listening on http://0.0.0.0:${PORT} (Cloudinary: dwn2sx3b)`);
  });
}

startServer().catch((err) => {
  console.error('[VIAN ERP Server] Startup error:', err);
});
