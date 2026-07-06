export async function onRequestPost(context) {
  try {
    const {
      image,
      originalPrompt,
      negativePrompt,
      aspectRatio,
      model,
    } = await context.request.json();

    if (!image) {
      return new Response(
        JSON.stringify({ error: 'Source image is required.' }),
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

    const promptParts = [
      'Upscale this image into a cleaner, sharper high-definition version.',
      'Preserve the exact composition, subject placement, colors, silhouette, and overall design.',
      'Add fine detail, clean edges, and richer texture without changing the scene.',
    ];

    if (originalPrompt?.trim()) {
      promptParts.push(`Original prompt context: ${originalPrompt.trim()}.`);
    }

    const combinedPrompt = negativePrompt?.trim()
      ? `${promptParts.join(' ')}. Avoid: ${negativePrompt.trim()}`
      : promptParts.join(' ');

    const base64Marker = 'base64,';
    const markerIndex = image.indexOf(base64Marker);
    const normalizedImage = markerIndex !== -1
      ? image.slice(markerIndex + base64Marker.length)
      : image;

    const body = {
      model: model || 'gpt-image-2',
      prompt: combinedPrompt,
      size: sizeMap[aspectRatio || '1:1'] || '1024x1024',
      response_format: 'url',
      image: [normalizedImage],
    };

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
        JSON.stringify({ error: 'Right Codes did not return an upscaled image URL.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const imgResponse = await fetch(imageUrl);
    const contentType = imgResponse.headers.get('content-type') || 'image/png';
    const arrayBuffer = await imgResponse.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    const base64 = btoa(String.fromCharCode(...bytes));
    const dataUrl = `data:${contentType};base64,${base64}`;

    return new Response(
      JSON.stringify({ success: true, image: dataUrl }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Upscale image error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
