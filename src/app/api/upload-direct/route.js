import cloudinary from '@/utils/cloudinary';

// Configure route to accept larger payloads
export const maxDuration = 60; // 60 seconds max execution time for large videos
export const runtime = 'nodejs';

// Disable body parsing limit - we'll handle it manually with FormData
export const dynamic = 'force-dynamic';

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

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check for unsupported file formats
    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.split('.').pop();
    const unsupportedFormats = ['heic', 'heif', 'raw', 'cr2', 'nef', 'orf', 'sr2'];
    
    if (unsupportedFormats.includes(fileExtension || '')) {
      return Response.json({ 
        error: 'Unsupported file format',
        message: `HEIC and RAW formats are not supported. Please convert to JPG, PNG, or WEBP.`,
        fileExtension: fileExtension
      }, { status: 400 });
    }

    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
    
    if (!validImageTypes.includes(file.type) && !validVideoTypes.includes(file.type) && !file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      return Response.json({ 
        error: 'Invalid file type',
        message: 'Please upload a valid image (JPG, PNG, GIF, WEBP, SVG) or video (MP4, WebM) file.',
        fileType: file.type
      }, { status: 400 });
    }

    // Determine resource type
    const resourceType = file.type.startsWith('video/') ? 'video' : 'image';

    // Convert File to buffer for Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary using upload_stream for large files
    const uploaded = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "profitness",
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });

    if (!uploaded || !uploaded.secure_url) {
      return Response.json({ 
        error: 'Upload failed', 
        message: 'No URL returned from Cloudinary',
        uploaded: uploaded ? 'Object exists but no secure_url' : 'No upload object'
      }, { status: 500 });
    }

    return Response.json({ 
      url: uploaded.secure_url,
      type: resourceType
    });
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

