import { NextRequest, NextResponse } from 'next/server';
import {
  NextResponse as GenkitNextResponse,
  middleware as genkitMiddleware,
} from '@genkit-ai/next';

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/genkit')) {
    // This is the Genkit API, so let Genkit handle it.
    return genkitMiddleware();
  }
  
  // For all other requests, continue as normal.
  return NextResponse.next();
}

export const config = {
  // This matches all paths except for the ones that start with specific static assets.
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
