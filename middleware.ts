import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DEFAULT_PASSWORD = "belal2026";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths exempt from authentication
  if (
    pathname === "/admin/login" ||
    pathname === "/admin/logout" ||
    pathname.startsWith("/api/admin/")
  ) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return response;
  }

  // Only apply to admin / keystatic routes
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/keystatic") ||
    pathname.startsWith("/api/keystatic")
  ) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");

    const expectedPassword = process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;

    // 1. Verify via admin_session cookie
    const authCookie = request.cookies.get("admin_session")?.value;
    const isCookieValid = authCookie === expectedPassword;

    // 2. Verify via HTTP Basic Auth header (fallback for external tools or API)
    let isBasicAuthValid = false;
    const basicAuth = request.headers.get("authorization");
    if (basicAuth?.startsWith("Basic ")) {
      try {
        const authValue = basicAuth.split(" ")[1];
        const [, pwd] = atob(authValue).split(":");
        if (pwd === expectedPassword) {
          isBasicAuthValid = true;
        }
      } catch {
        // malformed header, ignore
      }
    }

    if (isCookieValid || isBasicAuthValid) {
      // If user accesses /admin directly, redirect to Keystatic
      if (pathname === "/admin" || pathname === "/admin/") {
        const keystaticUrl = new URL("/keystatic", request.url);
        return NextResponse.redirect(keystaticUrl);
      }
      return response;
    }

    // Unauthenticated API request
    if (pathname.startsWith("/api/keystatic")) {
      return NextResponse.json(
        { error: "Admin authentication required" },
        { status: 401 }
      );
    }

    // Unauthenticated page request -> Redirect to /admin/login
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/keystatic/:path*",
    "/api/keystatic/:path*",
    "/api/admin/:path*",
  ],
};
