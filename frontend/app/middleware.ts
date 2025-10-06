import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const user = req.cookies.get("user") || null; // эсвэл localStorage оронд cookie
  const url = req.nextUrl.clone();

  // login хийгээгүй үед (cookie байхгүй)
  if (!user && !url.pathname.startsWith("/login")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // login хийсэн үед login page рүү буцаахгүй
  if (user && url.pathname.startsWith("/login")) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// middleware ажиллах route-ууд
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|login|register).*)",
  ],
};