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

// Configure route to accept larger payloads
export const maxDuration = 60; // 60 seconds max execution time for large videos
export const runtime = 'edge';

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

    const timestamp = Math.round(Date.now() / 1000);
    const signatureParams = {
      folder: 'profitness',
      timestamp,
      ...(resourceType !== 'image' ? { resource_type: resourceType } : {}),
    };

    const signature = await buildSignature(signatureParams, process.env.CLOUDINARY_API_SECRET);
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const uploadForm = new FormData();
    uploadForm.append('file', file);
    uploadForm.append('api_key', process.env.CLOUDINARY_API_KEY);
    uploadForm.append('timestamp', timestamp.toString());
    uploadForm.append('signature', signature);
    uploadForm.append('folder', 'profitness');
    if (resourceType !== 'image') {
      uploadForm.append('resource_type', resourceType);
    }

    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      body: uploadForm,
    });

    const uploaded = await uploadResponse.json();
    if (!uploadResponse.ok) {
      console.error('Cloudinary upload error:', uploaded);
      return Response.json(
        { error: 'Upload failed', message: uploaded?.error?.message || 'Cloudinary upload failed' },
        { status: 500 }
      );
    }

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

