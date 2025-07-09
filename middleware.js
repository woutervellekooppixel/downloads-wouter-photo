import { NextResponse } from 'next/server'

export function middleware(request) {
  const basicAuth = request.headers.get('authorization')

  const expectedAuth = 'Basic ' + Buffer.from(
    `${process.env.ADMIN_USER}:${process.env.ADMIN_PASS}`
  ).toString('base64')

  if (basicAuth === expectedAuth) {
    return NextResponse.next()
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Beheer"',
    },
  })
}

export const config = {
  matcher: ['/beheer'],
}
