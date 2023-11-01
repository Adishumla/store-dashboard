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
  //console.log("middleware data2: ", data2);
  const site = data2.docs?.find((site: { page: string }) => site.page === page);

  if (!site) {
    return NextResponse.next();
  }

  const response = await fetch(`${req.nextUrl.origin}/api/users/me`, {
    credentials: "include",
    headers: authHeaders,
  });

  if (!response.ok) {
    // handle error, e.g., log it, redirect to login page, etc.
    console.error("Failed to fetch user data:", await response.text());
    return NextResponse.redirect(`${req.nextUrl.origin}/`);
  }

  const data = await response.json();

  const siteMatch = data2.docs?.find(
    (site: { page: string }) => site.page === page
  );
  const match = siteMatch?.roles.find((role: string) =>
    data.user?.roles?.includes(role)
  );
  console.log("middleware-page: ", page);
  console.log("middleware match: ", match);
  console.log("site: ", site);
  console.log("middleware siteMatch: ", siteMatch);

  if (match !== undefined) {
    console.log("matched");
    //log all the info about the page that is being accessed on the api api/sites
    //find the page that matches the page that is being accessed on the api api/sites

    /* console.log("site: ", site);
    console.log("page: ", page);
    console.log("match: ", match); */

    /* if (!match && !data.user?.roles?.includes("admin")) {
      console.log("not matched");
      console.log("time: ", new Date().getTime());
      return NextResponse.redirect(`${req.nextUrl.origin}/`);
    } */

    // Go to dashboard if user is logged in
    return NextResponse.next();
  }
  console.log("not matched");
  return NextResponse.redirect(`${req.nextUrl.origin}/`);
}
