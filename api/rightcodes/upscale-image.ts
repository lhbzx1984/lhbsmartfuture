export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      image,
      originalPrompt,
      negativePrompt,
      aspectRatio,
      model,
    } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'Source image is required.' });
    }

    const apiKey = process.env.RIGHTCODES_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'RIGHTCODES_API_KEY not configured' });
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
          'User-Agent': 'kacey-ai-vercel',
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({ error: `Right Codes error: ${text}` });
    }

    const data = await response.json();
    const imageUrl = data?.data?.[0]?.url;
    if (!imageUrl) {
      return res.status(500).json({ error: 'Right Codes did not return an upscaled image URL.' });
    }

    const imgResponse = await fetch(imageUrl);
    const contentType = imgResponse.headers.get('content-type') || 'image/png';
    const arrayBuffer = await imgResponse.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    const base64 = Buffer.from(bytes).toString('base64');
    const dataUrl = `data:${contentType};base64,${base64}`;

    return res.json({ success: true, image: dataUrl });
  } catch (error) {
    console.error('Upscale image error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
