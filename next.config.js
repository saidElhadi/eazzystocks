/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    compiler: {
      styledComponents: true,
    },
    images: {
      domains: ['storage.googleapis.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'storage.googleapis.com',
          port: '',
          pathname: '/iex/api/logos/**',
        },
      ],
    },
  }

module.exports = nextConfig;
