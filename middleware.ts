import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  // Check if the pathname is '/services' or '/agenda'
  if (url.pathname === '/services' || url.pathname === '/agenda') {
    // Create a new URL for the home page
    const homeUrl = new URL('/', url)
    
    // Redirect to the home page
    return NextResponse.redirect(homeUrl)
  }

  // For all other routes, continue with the request
  return NextResponse.next()
}

export const config = {
  // Specify which paths this middleware should run on
  matcher: ['/services', '/agenda'],
}