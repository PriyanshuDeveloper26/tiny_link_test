/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [];
  },
  // Netlify deployment configuration
  output: process.env.NETLIFY === 'true' ? 'standalone' : undefined,
}

module.exports = nextConfig
