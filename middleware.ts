import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ottieni il cookie
  const roleCookie = req.cookies.get("role");

  // Verifica se il cookie esiste prima di confrontare
  if (pathname.startsWith("/admin")) {
    // roleCookie è di tipo RequestCookie | undefined
    const role = roleCookie?.value; // Estrai il valore del cookie

    if (!role || role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}
