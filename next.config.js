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
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin',
            },
            {
              key: 'Permissions-Policy',
              value: 'camera=(), microphone=(), geolocation=()',
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  