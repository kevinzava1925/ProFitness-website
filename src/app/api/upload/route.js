import cloudinary from '@/utils/cloudinary';

export async function POST(req) {
  try {
    const { image } = await req.json();

    if (!image) {
      return Response.json({ error: 'No image provided' }, { status: 400 });
    }

    // Upload base64 image to Cloudinary
    const uploaded = await cloudinary.uploader.upload(image, {
      folder: "profitness",
      resource_type: "auto",
    });

    return Response.json({ url: uploaded.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ 
      error: 'Upload failed', 
      message: error.message || 'Unknown error' 
    }, { status: 500 });
  }
}

