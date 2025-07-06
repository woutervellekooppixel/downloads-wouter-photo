import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 👇 Wijzig dit naar je eigen gebruikersnaam + wachtwoord
const USERNAME = "woutervellekoop";
const PASSWORD = "ZeeMeeuw58!#";

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get("authorization");

  if (basicAuth) {
    const [, encoded] = basicAuth.split(" ");
    const [user, pwd] = atob(encoded).split(":");

    if (user === USERNAME && pwd === PASSWORD) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

// Alleen toepassen op de download-slugs
export const config = {
  matcher: ["/:slug"], // of gebruik "/(.*)" als je alles wilt beveiligen
};