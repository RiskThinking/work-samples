/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  headers: [{key: "Access-Control-Allow-Origin", value: "true"},],

}

module.exports = nextConfig
