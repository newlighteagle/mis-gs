/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Turbopack configuration
  turbopack: {
    // Server-only modules are automatically excluded from client bundle
  },
}

module.exports = nextConfig

