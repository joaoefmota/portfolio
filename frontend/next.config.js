/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "web-production-5b14.up.railway.app",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
    ],
  },
};

const optimization = {
  optimization: {
    minimize: false, // disable minification
  },
};

module.exports = nextConfig, optimization;
