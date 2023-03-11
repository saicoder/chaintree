/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'w3s.link'
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  }
}

module.exports = nextConfig
