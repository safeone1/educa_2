import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export const middleware = async (req: NextRequest) => {
  // Allow login page without authentication
  if (req.nextUrl.pathname.startsWith("/login")) {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "no-store");
    return response;
  }

  const sessionCookie = getSessionCookie(req, {
    cookieName: "session_token",
    // cookiePrefix: "better-auth",
  });

  console.log("Session Cookie:", sessionCookie);

  // If no session cookie, redirect to login
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // User has session cookie, allow access
  return NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     * - api routes (handled separately by Better Auth)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$|api).*)",
  ],
};
