import cloudinary from '@/utils/cloudinary';

// Configure route to accept larger payloads (up to 50MB for base64 encoded files)
export const maxDuration = 30; // 30 seconds max execution time
export const runtime = 'nodejs';

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

    // Upload base64 image to Cloudinary
    let uploaded;
    try {
      uploaded = await cloudinary.uploader.upload(image, {
        folder: "profitness",
        resource_type: "auto",
      });
    } catch (cloudinaryError) {
      console.error('Cloudinary upload error:', cloudinaryError);
      return Response.json({ 
        error: 'Cloudinary upload failed', 
        message: cloudinaryError.message || 'Failed to upload to Cloudinary',
        cloudinaryError: cloudinaryError.toString()
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

