// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import acceptLanguageParser from 'accept-language-parser'

const PUBLIC_FILE = /\.(.*)$/
const locales = ['ar', 'en']
const defaultLocale = 'ar'

// استخراج أفضل لغة من المتصفح
function getBestLocale(request: NextRequest): string {
  const header = request.headers.get('accept-language')
  if (!header) return defaultLocale

  const parsed = acceptLanguageParser.parse(header)
  const bestMatch = acceptLanguageParser.pick(locales, parsed)
  return bestMatch || defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // تجاهل ملفات API والـ static
  if (pathname.startsWith('/api') || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next()
  }

  // ✅ لو المسار فيه لغة زي "/ar/login" → سبه
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
