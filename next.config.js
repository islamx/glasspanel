const withNextIntl = require('next-intl/plugin')(
  './src/i18n/request.ts',
  {
    experimental: {
      middleware: true
    }
  }
)

const nextConfig = {
  reactStrictMode: true
}

module.exports = withNextIntl(nextConfig)
