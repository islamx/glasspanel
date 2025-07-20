// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import acceptLanguageParser from 'accept-language-parser'

const PUBLIC_FILE = /\.(.*)$/
const locales = ['ar', 'en']
const defaultLocale = 'ar'

// Extract the best language from the browser
function getBestLocale(request: NextRequest): string {
  const header = request.headers.get('accept-language')
  if (!header) return defaultLocale

  const parsed = acceptLanguageParser.parse(header)
  const bestMatch = acceptLanguageParser.pick(locales, parsed)
  return bestMatch || defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignore API and static files
  if (pathname.startsWith('/api') || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next()
  }

  // ✅ If the path has a locale like "/ar/login" → let it pass
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = getBestLocale(request)
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
