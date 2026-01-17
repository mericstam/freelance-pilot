/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow build to continue even if external resources fail
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig