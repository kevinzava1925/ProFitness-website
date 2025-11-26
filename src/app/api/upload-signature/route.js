import cloudinary from '@/utils/cloudinary';
import crypto from 'crypto';

// Generate upload signature for client-side direct upload
export async function GET(req) {
  try {
    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET || !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      return Response.json({ 
        error: 'Cloudinary not configured' 
      }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const resourceType = searchParams.get('resource_type') || 'image';
    const folder = searchParams.get('folder') || 'profitness';

    // Generate timestamp
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Create parameters object (only include parameters that will be sent in the upload)
    const params = {
      folder,
      timestamp,
    };

    // Only include resource_type if it's not 'image' (default)
    if (resourceType !== 'image') {
      params.resource_type = resourceType;
    }

    // Sort parameters alphabetically by key
    const sortedKeys = Object.keys(params).sort();
    const sortedParams = sortedKeys
      .map(key => `${key}=${params[key]}`)
      .join('&');

    // Create signature string: sorted params + API secret
    const signatureString = sortedParams + process.env.CLOUDINARY_API_SECRET;

    // Generate SHA1 signature
    const signature = crypto
      .createHash('sha1')
      .update(signatureString)
      .digest('hex');

    return Response.json({
      signature,
      timestamp,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      folder,
      resourceType,
    });
  } catch (error) {
    console.error('Signature generation error:', error);
    return Response.json({ 
      error: 'Failed to generate signature',
      message: error.message 
    }, { status: 500 });
  }
}

