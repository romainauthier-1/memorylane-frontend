/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // médias hébergés sur Cloudinary
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
