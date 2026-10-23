/**
 * Backend API Client & URL Resolution
 * 
 * Configured to connect:
 * - Frontend: https://vian-orcin.vercel.app
 * - Backend:  https://vian-si5n.onrender.com
 */

// If VITE_API_BASE_URL is explicitly set (e.g. in Vercel environment variables), use it.
// Default to the user's Render backend URL or fallback to relative URL for Vercel edge proxy.
export const RENDER_BACKEND_URL = 'https://vian-si5n.onrender.com';

export const API_BASE_URL = 
  (import.meta.env.VITE_API_BASE_URL as string) || 
  (window.location.hostname.includes('vercel.app') ? '' : '');

/**
 * Returns canonical full API URL for a given endpoint.
 * Strictly guarantees that no duplicate '/api/api' path segments can be formed,
 * regardless of whether the environment variable includes a trailing '/api' or not.
 */
export function getApiUrl(endpoint: string, forceRenderDirect = false): string {
  let clean = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  if (forceRenderDirect) {
    const baseUrl = RENDER_BACKEND_URL.replace(/\/+$/, '');
    if (baseUrl.endsWith('/api') && clean.startsWith('/api/')) {
      clean = clean.replace(/^\/api/, '');
    }
    return `${baseUrl}${clean}`;
  }

  const base = ((import.meta.env.VITE_API_BASE_URL as string) || '').trim().replace(/\/+$/, '');
  if (base) {
    if (base.endsWith('/api') && clean.startsWith('/api/')) {
      clean = clean.replace(/^\/api/, '');
    }
    return `${base}${clean}`;
  }
  return clean;
}

export interface BackendStatus {
  online: boolean;
  url: string;
  latencyMs?: number;
  message?: string;
}

/**
 * Ping backend health endpoint to verify Render connectivity.
 * Tests Vercel edge rewrite proxy first, followed by direct Render origin fallback.
 */
export async function checkBackendStatus(): Promise<BackendStatus> {
  const start = Date.now();
  const targets = [
    getApiUrl('/api/cloudinary-status'),
    `${RENDER_BACKEND_URL}/api/cloudinary-status`,
    getApiUrl('/api/health'),
    `${RENDER_BACKEND_URL}/api/health`
  ];
  
  for (const target of targets) {
    try {
      const res = await fetch(target, { 
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(6000)
      });
      if (res.ok) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          return {
            online: true,
            url: target,
            latencyMs: Date.now() - start,
            message: 'Connected to VIAN Production API'
          };
        }
      }
    } catch {
      // Continue to fallback
    }
  }

  return {
    online: false,
    url: RENDER_BACKEND_URL,
    message: 'Render service warming up or unreachable (Free tier spins down after inactivity)'
  };
}
