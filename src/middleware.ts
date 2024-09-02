import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  console.log('Middleware invoked for:', url.pathname)

  if (url.pathname === '/services' || url.pathname === '/agenda' || url.pathname === '/publications_sgha_2018_overview' || url.pathname === '/events2023' || url.pathname === '/events2022' || url.pathname === '/events2021') {
    console.log('Redirecting to home page from:', url.pathname)
    const homeUrl = new URL('/', url)
    return NextResponse.redirect(homeUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/services', '/agenda', '/publications_sgha_2018_overview'],
}