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

module.exports = nextConfig;
