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

  const bestMatch = acceptLanguageParser.pick(locales, header)
  return bestMatch || defaultLocale
}

// Get stored language preference from cookies
function getStoredLocale(request: NextRequest): string | null {
  const cookie = request.cookies.get('preferred-locale')
  return cookie?.value && locales.includes(cookie.value) ? cookie.value : null
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
    // First check for stored preference, then fall back to browser language
    const storedLocale = getStoredLocale(request)
    const locale = storedLocale || getBestLocale(request)
    
    const response = NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
    
    // Set the cookie if it doesn't exist (for first-time visitors)
    if (!storedLocale) {
      response.cookies.set('preferred-locale', locale, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: '/',
        httpOnly: false, // Allow client-side access
        sameSite: 'lax'
      })
    }
    
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
