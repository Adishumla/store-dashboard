import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("payload-token")?.value;
  console.log("token: ", token);
  if (req.nextUrl.pathname === "/dashboard") {
    const response = await fetch(`${req.nextUrl.origin}/api/users/me`, {
      credentials: "include",
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    const data = await response.json();
    console.log("data: ", data);
    if (data.user === null) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Go to dashboard if user is logged in
    return NextResponse.next();
  }
  return NextResponse.next();
}
