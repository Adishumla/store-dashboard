import { cookies } from "next/headers";
import { headers } from "next/headers";

export default async function GetUserEmail() {
  const cookieStore = cookies();
  const headerList = headers();
  const token = cookieStore.get("payload-token")?.value;

  const authHeaders = {
    Authorization: `JWT ${token}`,
  };
  const getUserInfo = await fetch(process.env.ORIGIN + "/api/users/me", {
    credentials: "include",
    headers: authHeaders,
  });

  const userInfo = await getUserInfo.json();

  const userEmail = userInfo.user?.email;

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
