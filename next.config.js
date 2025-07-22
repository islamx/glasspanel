const withNextIntl = require('next-intl/plugin')(
  './src/i18n/request.ts',
  {
    experimental: {
      middleware: true
    }
  }
)

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'x58j0424d23i437.pocketbasecloud.com',
        port: '',
        pathname: '/api/files/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8090',
        pathname: '/api/files/**',
      },
    ],
  },
}

module.exports = withNextIntl(nextConfig)
