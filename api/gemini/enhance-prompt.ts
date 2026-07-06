export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { prompt } = req.body;
  return res.json({
    original: prompt || '',
    enhanced: prompt || '',
    info: 'Prompt enhancement is disabled in Vercel build.',
  });
}
