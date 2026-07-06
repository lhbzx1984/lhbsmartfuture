export async function onRequestPost(context) {
  try {
    const {
      prompt,
      negativePrompt,
      aspectRatio,
      referenceImage,
      referenceBindingNote,
      model,
    } = await context.request.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = context.env.RIGHTCODES_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'RIGHTCODES_API_KEY not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const sizeMap = {
      '1:1': '1024x1024',
      '3:4': '1024x1536',
      '4:3': '1536x1024',
      '9:16': '1024x1536',
      '16:9': '1536x1024',
      'auto': 'auto',
    };

    const promptWithRef = referenceBindingNote?.trim()
      ? `${referenceBindingNote.trim()}\n\n${prompt}`
      : prompt;
    const combinedPrompt = negativePrompt?.trim()
      ? `${promptWithRef}. Avoid: ${negativePrompt.trim()}`
      : promptWithRef;

    const body = {
      model: model || 'gpt-image-2',
      prompt: combinedPrompt,
      size: sizeMap[aspectRatio || '1:1'] || '1024x1024',
      response_format: 'url',
    };

    if (referenceImage) {
      const base64Marker = 'base64,';
      const markerIndex = referenceImage.indexOf(base64Marker);
      const normalizedImage = markerIndex !== -1
        ? referenceImage.slice(markerIndex + base64Marker.length)
        : referenceImage;
      body.image = [normalizedImage];
    }

    const images = [];
    for (let i = 0; i < 1; i += 1) {
      const response = await fetch(
        'https://www.right.codes/draw/v1/images/generations',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'User-Agent': 'kacey-ai-pages',
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        return new Response(
          JSON.stringify({ error: `Right Codes error: ${text}` }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const data = await response.json();
      const imageUrl = data?.data?.[0]?.url;
      if (!imageUrl) {
        return new Response(
          JSON.stringify({ error: 'Right Codes did not return a generated image URL.' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const imgResponse = await fetch(imageUrl);
      const contentType = imgResponse.headers.get('content-type') || 'image/png';
      const arrayBuffer = await imgResponse.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const base64 = btoa(String.fromCharCode(...bytes));
      const dataUrl = `data:${contentType};base64,${base64}`;
      images.push(dataUrl);
    }

    return new Response(
      JSON.stringify({ success: true, images }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Generate image error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
