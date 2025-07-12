import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // For all requests, continue as normal.
  return NextResponse.next();
}

export const config = {
  // This matches all paths except for the ones that start with specific static assets.
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
