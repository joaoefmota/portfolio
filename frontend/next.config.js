/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cv-portfolio-back.herokuapp.com",
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
