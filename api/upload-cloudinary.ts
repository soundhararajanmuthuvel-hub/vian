import crypto from 'crypto';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image, title, zone, coordinates, accuracy, siteName } = req.body || {};
    if (!image) {
      return res.status(400).json({ error: 'Missing image data (base64 or URL required)' });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'dwn2sx3b';
    const apiKey = process.env.CLOUDINARY_API_KEY || '225689611225281';
    const primarySecret = process.env.CLOUDINARY_API_SECRET || 'yOef6D21VeHsoxKxIbd8IOc0GIg';

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
        cloudName
      });
    }

    return res.status(200).json({
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
    console.error('Vercel serverless Cloudinary upload error:', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
