/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  headers: [{key: "Access-Control-Allow-Origin", value: "https://risk-viz-delta.vercel.app/"},],

}

module.exports = nextConfig
