/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Completely disable lightningcss
    css: false,
  },
};

export default nextConfig;
