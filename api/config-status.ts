export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const hasRightCodesKey = !!process.env.RIGHTCODES_API_KEY;
  return res.json({
    hasKey: hasRightCodesKey,
    hasRightCodesKey,
    appName: 'Kacey AI - AIGC Image Generation Canvas',
  });
}
