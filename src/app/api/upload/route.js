const encoder = new TextEncoder();

async function sha1Hex(input) {
  const data = encoder.encode(input);
  const hash = await crypto.subtle.digest('SHA-1', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function buildSignature(params, apiSecret) {
  const sortedKeys = Object.keys(params).sort();
  const sortedParams = sortedKeys
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  return sha1Hex(sortedParams + apiSecret);
}

// Configure route to accept larger payloads (up to 50MB for base64 encoded files)
export const maxDuration = 30; // 30 seconds max execution time
export const runtime = 'edge';

export async function POST(req) {
  try {
    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET || !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      console.error('Cloudinary configuration missing:', {
        hasApiKey: !!process.env.CLOUDINARY_API_KEY,
        hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
        hasCloudName: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      });
      return Response.json({ 
        error: 'Cloudinary not configured', 
        message: 'Please configure Cloudinary environment variables' 
      }, { status: 500 });
    }

    const { image } = await req.json();

    if (!image) {
      return Response.json({ error: 'No image provided' }, { status: 400 });
    }

    // Validate base64 string format
    if (!image.startsWith('data:')) {
      return Response.json({ 
        error: 'Invalid image format', 
        message: 'Image must be in base64 data URL format' 
      }, { status: 400 });
    }

    const timestamp = Math.round(Date.now() / 1000);
    const signatureParams = {
      folder: 'profitness',
      timestamp,
      resource_type: 'auto',
    };

    const signature = await buildSignature(signatureParams, process.env.CLOUDINARY_API_SECRET);
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

    const uploadForm = new FormData();
    uploadForm.append('file', image);
    uploadForm.append('api_key', process.env.CLOUDINARY_API_KEY);
    uploadForm.append('timestamp', timestamp.toString());
    uploadForm.append('signature', signature);
    uploadForm.append('folder', 'profitness');
    uploadForm.append('resource_type', 'auto');

    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      body: uploadForm,
    });

    const uploaded = await uploadResponse.json();
    if (!uploadResponse.ok) {
      console.error('Cloudinary upload error:', uploaded);
      return Response.json({ 
        error: 'Cloudinary upload failed', 
        message: uploaded?.error?.message || 'Failed to upload to Cloudinary',
        cloudinaryError: uploaded?.error || uploaded
      }, { status: 500 });
    }

    if (!uploaded || !uploaded.secure_url) {
      return Response.json({ 
        error: 'Upload failed', 
        message: 'No URL returned from Cloudinary',
        uploaded: uploaded ? 'Object exists but no secure_url' : 'No upload object'
      }, { status: 500 });
    }

    return Response.json({ url: uploaded.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ 
      error: 'Upload failed', 
      message: error.message || 'Unknown error',
      errorType: error.constructor.name,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

