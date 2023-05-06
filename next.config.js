/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  headers: [{key: "Access-Control-Allow-Origin"}]
}

module.exports = nextConfig
