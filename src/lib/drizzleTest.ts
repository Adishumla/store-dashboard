import getPayloadClient from "@/payload/payloadClient";

const payload = await getPayloadClient();

const orders = await payload.find({
  collection: "orders",
});
const products = await payload.find({
  collection: "products",
});

//export orders
//export products

export { orders, products };
