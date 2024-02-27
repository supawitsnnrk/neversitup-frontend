import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("", "http://localhost:3000"));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/todo/:path*",
};
