import cloudinary from '@/utils/cloudinary';

// Configure route to accept larger payloads
export const maxDuration = 60; // 60 seconds max execution time for large videos
export const runtime = 'nodejs';

import { requireAdmin } from '@/utils/auth';
import { rateLimit, getClientIP } from '@/utils/rateLimit';

export async function POST(req) {
  try {
    // Require admin authentication
    let adminUser;
    try {
      adminUser = await requireAdmin(req);
    } catch (authError) {
      return Response.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    // Rate limiting - Higher limit for authenticated admins (100 uploads per hour)
    const clientIP = getClientIP(req);
    const rateLimitKey = `admin-upload-${adminUser.userId || clientIP}`;
    if (!rateLimit(rateLimitKey, 100, 60 * 60 * 1000)) { // 100 uploads per hour for admins
      return Response.json(
        { error: 'Too many uploads. Please try again later.' },
        { status: 429 }
      );
    }

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

    // Validate file type
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
    const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];
    
    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { error: 'File type not allowed. Allowed types: JPEG, PNG, WEBP, GIF, MP4, WEBM, MOV' },
        { status: 400 }
      );
    }

    // Validate file size
    const maxImageSize = 20 * 1024 * 1024; // 20MB
    const maxVideoSize = 200 * 1024 * 1024; // 200MB
    const isImage = file.type.startsWith('image/');
    const maxSize = isImage ? maxImageSize : maxVideoSize;
    
    if (file.size > maxSize) {
      const maxSizeMB = isImage ? 20 : 200;
      return Response.json(
        { error: `File size exceeds limit. Maximum size: ${maxSizeMB}MB` },
        { status: 400 }
      );
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
      details: process.env.NODE_ENV === 'development' ? error.stack : 'An error occurred during upload'
    }, { status: 500 });
  }
}

