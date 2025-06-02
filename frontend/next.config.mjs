/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    legacyCss: true, // This disables lightningcss
  },
};

export default nextConfig;
