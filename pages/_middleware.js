import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;

  //  Allow the requests if the following is true...
  // 1) Its a request for next-auth session & provider fetching
  // 2) the token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // Redirect them to login if doesn't have token
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(
      process.env.LOGIN_URL
        ? process.env.LOGIN_URL
        : "http://localhost:3000/login"
    );
  }
}
