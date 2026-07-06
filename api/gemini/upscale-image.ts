export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  return res.status(410).json({ error: 'Upscaling is not available via Gemini in Vercel build. Use /api/rightcodes/upscale-image instead.' });
}
