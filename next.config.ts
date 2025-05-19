/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    domains: ['lh3.googleusercontent.com'], // 👈 Add this line
  },
};

module.exports = nextConfig;
