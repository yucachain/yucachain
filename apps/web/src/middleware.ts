import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("yc_token")?.value;
  const role = request.cookies.get("yc_role")?.value;
  const path = request.nextUrl.pathname;
  const signIn = new URL("/sign-in", request.url);

  if (path.startsWith("/buyer") && (!token || role !== "BUYER")) return NextResponse.redirect(signIn);
  if (path.startsWith("/seller") && (!token || role !== "SELLER")) return NextResponse.redirect(signIn);
  if (path.startsWith("/admin") && (!token || role !== "ADMIN")) return NextResponse.redirect(signIn);
  return NextResponse.next();
}

export const config = {
  matcher: ["/buyer/:path*", "/seller/:path*", "/admin/:path*"],
};
