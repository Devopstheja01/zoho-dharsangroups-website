/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    // Explicitly set base path and asset prefix for Netlify
    basePath: '',
    assetPrefix: '',
}

module.exports = nextConfig
