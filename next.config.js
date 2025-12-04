/** @type {import('next').NextConfig} */
const nextConfig = {
    // Removed 'output: export' to enable full Next.js features (API routes, SSR, etc.)
    images: {
      // Removed 'unoptimized: true' to enable Next.js image optimization
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'ext.same-assets.com',
        },
        {
          protocol: 'https',
          hostname: 'same-assets.com',
        },
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        },
        {
          protocol: 'https',
          hostname: 'uitncbzxnumrnslfucso.supabase.co',
        },
        {
          protocol: 'https',
          hostname: '*.supabase.co',
        },
      ],
    },
  };
  
  export default nextConfig;
  