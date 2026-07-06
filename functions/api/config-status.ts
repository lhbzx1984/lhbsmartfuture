export function onRequestGet(context) {
  const hasRightCodesKey = !!context.env.RIGHTCODES_API_KEY;
  return new Response(
    JSON.stringify({
      hasKey: hasRightCodesKey,
      hasRightCodesKey,
      appName: 'Kacey AI - AIGC Image Generation Canvas',
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
