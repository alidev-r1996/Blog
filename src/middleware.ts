import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// This should match the path you want to protect
const protectedPaths = ['/', '/profile', 'notifications']; // Specify your protected routes here

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.AUTH_SECRET });

  // If the user is authenticated and accesses the sign-in page, redirect them
  if (session && req.nextUrl.pathname === '/signin') {
    return NextResponse.redirect(new URL('/profile', req.url)); // or any page you want authenticated users to access
  }

  // If the user is not authenticated and tries to access a protected route
  if (!session && protectedPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/signin', req.url)); // Redirect to sign-in page
  }

  // Continue processing the request as usual
  return NextResponse.next();
}

// Optionally, you can define the paths where your middleware should run
export const config = {
  matcher: ['/profile/:path*', '/dashboard/:path*', '/signin', '/notifications/:path'], // Specify routes to apply middleware
};


