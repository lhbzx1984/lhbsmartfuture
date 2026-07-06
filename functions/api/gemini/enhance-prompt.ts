export async function onRequestPost(context) {
  const { prompt } = await context.request.json();
  return new Response(
    JSON.stringify({
      original: prompt || '',
      enhanced: prompt || '',
      info: 'Prompt enhancement is disabled in Pages build.',
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
