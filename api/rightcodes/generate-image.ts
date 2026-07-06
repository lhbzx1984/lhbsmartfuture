export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      prompt,
      negativePrompt,
      aspectRatio,
      referenceImage,
      referenceBindingNote,
      model,
    } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
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

    const promptWithRef = referenceBindingNote?.trim()
      ? `${referenceBindingNote.trim()}\n\n${prompt}`
      : prompt;
    const combinedPrompt = negativePrompt?.trim()
      ? `${promptWithRef}. Avoid: ${negativePrompt.trim()}`
      : promptWithRef;

    const body: { model: string; prompt: string; size: string; response_format: string; image?: string[] } = {
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
        return res.status(500).json({ error: 'Right Codes did not return a generated image URL.' });
      }

      const imgResponse = await fetch(imageUrl);
      const contentType = imgResponse.headers.get('content-type') || 'image/png';
      const arrayBuffer = await imgResponse.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const base64 = Buffer.from(bytes).toString('base64');
      const dataUrl = `data:${contentType};base64,${base64}`;
      images.push(dataUrl);
    }

    return res.json({ success: true, images });
  } catch (error) {
    console.error('Generate image error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
