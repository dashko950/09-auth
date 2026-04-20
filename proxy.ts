import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const isAuthenticated = !!token;
  const { pathname } = request.nextUrl;

  // Публічні маршрути (доступні без авторизації)
  const isPublicRoute =
    pathname === "/sign-in" || pathname === "/sign-up" || pathname === "/";

  // Приватні маршрути (доступні тільки з авторизацією)
  const isPrivateRoute =
    pathname.startsWith("/profile") || pathname.startsWith("/notes");

  // Перенаправлення для приватних маршрутів
  if (isPrivateRoute && !isAuthenticated) {
    const signInUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(signInUrl);
  }

  // Перенаправлення для публічних маршрутів (якщо користувач вже авторизований)
  if (isPublicRoute && isAuthenticated && pathname !== "/") {
    const profileUrl = new URL("/profile", request.url);
    return NextResponse.redirect(profileUrl);
  }

  // Продовжуємо виконання запиту
  return NextResponse.next();
}

// Конфігурація для middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
