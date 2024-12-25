import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
    console.log('Middleware invoked for:', url.pathname)

  if (url.pathname === '/services' || url.pathname === '/agenda' || url.pathname === '/events2023' || url.pathname === '/events2022' || url.pathname === '/events2021') {
      console.log('Redirecting to home page from:', url.pathname)
    const homeUrl = new URL('/', url)
    return NextResponse.redirect(homeUrl)
  }

  if (url.pathname === '/publications_sgha_2018_overview') {
    console.log('Redirecting to sgha2018 page from:', url.pathname)
  const sgha2018Url = new URL('/sgha2018', url)
  return NextResponse.redirect(sgha2018Url)
}

  return NextResponse.next()
}

export const config = {
  matcher: ['/services', '/agenda', '/publications_sgha_2018_overview', '/events2023', '/events2022', '/events2021'],
}