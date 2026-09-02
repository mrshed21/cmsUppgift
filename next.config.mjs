/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        
        source: "/(.*)",
        headers: [
          {
        
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://app.storyblok.com https://*.storyblok.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
