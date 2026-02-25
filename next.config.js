/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "memorylane-backend.vercel.app"],
  },
};

module.exports = nextConfig;
