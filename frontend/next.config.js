/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        //hostname: "cv-portfolio-back.herokuapp.com",
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
