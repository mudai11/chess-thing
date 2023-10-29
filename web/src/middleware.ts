import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let accessToken = request.cookies.get("accessToken");
  if (request.nextUrl.pathname.toString() === "/sign-in") {
    if (accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.next();
    }
  }
  if (request.nextUrl.pathname.toString() === "/sign-up") {
    if (accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.next();
    }
  }
}
