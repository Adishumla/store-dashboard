import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/dashboard") {
    const response = await fetch(`${req.nextUrl.origin}/api/users/me`, {
      credentials: "include",
    });
    const data = await response.json();
    if (data.user === null) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Proceed to the /dashboard route when the user is logged in.
    return NextResponse.next();
  }
  return NextResponse.next();
}
