export async function onRequestPost() {
  return new Response(
    JSON.stringify({ error: 'Background cutout is not available in Pages build.' }),
    { status: 410, headers: { 'Content-Type': 'application/json' } }
  );
}
