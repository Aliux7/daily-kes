import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = cookies().get("accessToken")?.value;
  const decodedToken = accessToken ? jwt.decode(accessToken) : "";

  if (
    request.nextUrl.pathname == "/login" ||
    request.nextUrl.pathname == "/register"
  ) {
    if (decodedToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  } else if (request.nextUrl.pathname == "/") {
    if (!decodedToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
}
