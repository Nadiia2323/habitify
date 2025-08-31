import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

const secretEnv = process.env.JWT_SECRET;
if (!secretEnv) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}
const SECRET = new TextEncoder().encode(secretEnv);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Если нет токена и идём в /dashboard → редирект на /login
  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token) {
    try {
      await jose.jwtVerify(token, SECRET);
      return NextResponse.next();
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("❌ Invalid or expired token:", error);
      }
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
