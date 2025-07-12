import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // For all requests, continue as normal.
  return NextResponse.next();
}

export const config = {
  // This matches all paths except for API routes and static assets.
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
