/* import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function getOrders() {
  const token = cookies().get("payload-token")?.value;
  const authHeaders = {
    Authorization: `JWT ${token}`,
  };

  const data = await fetch(process.env.ORIGIN + "/api/orders", {
    credentials: "include",
    headers: authHeaders,
  });

  const orders = await data.json();
  console.log("orders: ", orders);

  return orders;
}

export default async function AllOrders(req: NextRequest) {
  const orders = await getOrders();

  return NextResponse.json(orders);
}
 */
