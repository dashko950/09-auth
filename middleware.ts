import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const isAuthenticated = !!token;
  const { pathname } = request.nextUrl;

  // Public routes
  const isPublicRoute = pathname === "/sign-in" || pathname === "/sign-up";

  // Private routes
  const isPrivateRoute =
    pathname.startsWith("/profile") || pathname.startsWith("/notes");

  // Redirect logic
  if (isPrivateRoute && !isAuthenticated) {
    const signInUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(signInUrl);
  }

  if (isPublicRoute && isAuthenticated) {
    const profileUrl = new URL("/profile", request.url);
    return NextResponse.redirect(profileUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
