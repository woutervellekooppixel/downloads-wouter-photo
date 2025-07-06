import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 🔐 Inloggegevens
const USERNAME = "wouter";
const PASSWORD = "downloads123";

export function middleware(request: NextRequest) {
  // Alleen beveiligen als het exact de homepage is
  if (request.nextUrl.pathname === "/") {
    const auth = request.headers.get("authorization");

    if (auth) {
      const [, encoded] = auth.split(" ");
      const [user, pwd] = atob(encoded).split(":");

      if (user === USERNAME && pwd === PASSWORD) {
        return NextResponse.next();
      }
    }

    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="downloads.wouter.photo"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // Alleen de root beveiligen
};