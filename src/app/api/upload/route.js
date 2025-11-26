import cloudinary from '@/utils/cloudinary';

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

    // Upload base64 image to Cloudinary
    const uploaded = await cloudinary.uploader.upload(image, {
      folder: "profitness",
      resource_type: "auto",
    });

    if (!uploaded || !uploaded.secure_url) {
      return Response.json({ 
        error: 'Upload failed', 
        message: 'No URL returned from Cloudinary' 
      }, { status: 500 });
    }

    return Response.json({ url: uploaded.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ 
      error: 'Upload failed', 
      message: error.message || 'Unknown error',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

