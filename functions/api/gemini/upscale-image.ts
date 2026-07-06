export async function onRequestPost() {
  return new Response(
    JSON.stringify({ error: 'Upscaling is not available via Gemini in Pages build. Use /api/rightcodes/upscale-image instead.' }),
    { status: 410, headers: { 'Content-Type': 'application/json' } }
  );
}
