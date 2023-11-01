import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export default async function GetUserEmail() {
  const cookieStore = cookies();
  const token = cookieStore.get("payload-token")?.value;

  const authHeaders = {
    Authorization: `JWT ${token}`,
  };

  const getUserInfo = await fetch(`http://localhost:3000/api/users/me`, {
    credentials: "include",
    headers: authHeaders,
  });

  const userInfo = await getUserInfo.json();

  const userEmail = userInfo.user.email;

  return (
    <>
      {userEmail ? (
        <p className="text-2xl">Welcome, {userEmail}</p>
      ) : (
        <p className="text-2xl">Welcome, Guest</p>
      )}
    </>
  );
}
