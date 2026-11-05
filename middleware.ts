import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply to admin / keystatic routes
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/keystatic") ||
    pathname.startsWith("/api/keystatic")
  ) {
    const response = NextResponse.next();

    // Prevent search engine indexing of admin and keystatic API
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");

    // In local development, allow unrestricted access
    if (process.env.NODE_ENV !== "production") {
      return response;
    }

    // Optional HTTP Basic Auth or Secret Passcode protection in production
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (adminPassword) {
      const basicAuth = request.headers.get("authorization");
      if (basicAuth) {
        const authValue = basicAuth.split(" ")[1];
        const [, pwd] = atob(authValue).split(":");
        if (pwd === adminPassword) {
          return response;
        }
      }

      // Check session cookie if set
      const authCookie = request.cookies.get("admin_session")?.value;
      if (authCookie === adminPassword) {
        return response;
      }

      return new NextResponse("Admin Authentication Required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Portfolio Admin Panel"',
          "X-Robots-Tag": "noindex, nofollow",
        },
      });
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/keystatic/:path*", "/api/keystatic/:path*"],
};

