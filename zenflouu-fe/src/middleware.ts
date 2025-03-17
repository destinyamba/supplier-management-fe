import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // if pathname starts with route in protectedRoutes, check for authtoken in cookies
  const protectedRoutes = [
    "/dashboard",
    "/suppliers",
    "/discover",
    "/work-orders",
    "/user-management",
    "/clients",
    "/company-profile",
    "/compliance",
  ];

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const authToken = req.cookies.get("authToken")?.value;

    if (!authToken) {
      return NextResponse.redirect(new URL("/403", req.url));
    }
  }

  return NextResponse.next();
}
