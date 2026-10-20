export default function handler(req: any, res: any) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'dwn2sx3b';
  const apiKey = process.env.CLOUDINARY_API_KEY || '225689611225281';
  res.status(200).json({
    configured: true,
    cloudName,
    apiKey: apiKey ? `${apiKey.slice(0, 4)}...${apiKey.slice(-3)}` : null,
    folder: 'vian_jobsite'
  });
}
