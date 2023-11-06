import getPayloadClient from "@/payload/payloadClient";

const payload = await getPayloadClient();

const today = new Date();
const todayISO = today.toISOString();
const thisMonth = todayISO.slice(0, 8) + "01T00:00:00.000Z";
const lastDayThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

async function getOrders(month: any) {
  const orders = await payload.find({
    collection: "orders",
    where: {
      orderDate: {
        greater_than: thisMonth,
        less_than_equal: lastDayThisMonth,
      },
    },
  });
}
const orders = await payload.find({
  collection: "orders",
});

const products = await payload.find({
  collection: "products",
});

export { orders, products, getOrders };
