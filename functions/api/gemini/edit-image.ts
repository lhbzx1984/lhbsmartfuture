export async function onRequestPost() {
  return new Response(
    JSON.stringify({ error: 'Image editing is not available in Pages build.' }),
    { status: 410, headers: { 'Content-Type': 'application/json' } }
  );
}
