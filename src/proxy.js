import { NextResponse } from "next/server";
import { verifyAcademyToken } from "@/lib/academy-auth";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/academy/dashboard")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("academy_token")?.value;

  if (!token) {
    const loginUrl = new URL("/academy/login", request.url);

    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  const student = await verifyAcademyToken(token);

  if (!student) {
    const loginUrl = new URL("/academy/login", request.url);

    loginUrl.searchParams.set("redirect", pathname);

    const response = NextResponse.redirect(loginUrl);

    response.cookies.set("academy_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/academy/dashboard/:path*"],
};
