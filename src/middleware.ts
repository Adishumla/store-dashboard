import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("payload-token")?.value;
  const page = req.nextUrl.pathname.slice(1);

  const authHeaders = {
    Authorization: `JWT ${token}`,
  };

  const response2 = await fetch(`${req.nextUrl.origin}/api/sites`, {
    credentials: "include",
    headers: authHeaders,
  });

  if (!response2.ok) {
    console.error("Failed to fetch sites:", await response2.text());
    return NextResponse.error();
  }

  const data2 = await response2.json();
  const siteMatch = data2.docs?.find(
    (site: { page: string }) => site.page === page
  );

  if (!siteMatch) {
    return NextResponse.next();
  }

  const response = await fetch(`${req.nextUrl.origin}/api/users/me`, {
    credentials: "include",
    headers: authHeaders,
  });

  if (!response.ok) {
    console.error("Failed to fetch user data:", await response.text());
    return NextResponse.redirect(`${req.nextUrl.origin}/`);
  }

  const data = await response.json();

  const match = siteMatch.roles.find((role: string) =>
    data.user?.roles?.includes(role)
  );

  if (match !== undefined) {
    return NextResponse.next();
  }

  console.log("User role does not match, redirecting");
  return NextResponse.redirect(`${req.nextUrl.origin}/`);
}
