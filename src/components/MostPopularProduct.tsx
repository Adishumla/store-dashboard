import { Card } from "./ui/card";
import { Text, Metric } from "@tremor/react";
import { Document, Item } from "@/lib/type";

export default function MostPopularProduct({ docs }: { docs: Document[] }) {
  const productCounts = docs.reduce(
    (acc: Record<string, number>, order: Document) => {
      order.items.forEach((item: Item) => {
        const productTitle: string = item.product.title;
        if (!acc[productTitle]) {
          acc[productTitle] = 0;
        }
        acc[productTitle] += item.quantity;
      });
      return acc;
    },
    {}
  );

  let mostPopularProduct = "";
  let highestCount = 0;

  for (const [product, count] of Object.entries(productCounts)) {
    if (count > highestCount) {
      mostPopularProduct = product;
      highestCount = count;
    }
  }

  return (
    <Card className="flex flex-col gap-2 w-64 p-4">
      <div className="flex flex-row justify-between">
        <Text>Most Popular Product</Text>
      </div>
      <Metric>{mostPopularProduct}</Metric>
      <div className="flex flex-row justify-between items-center">
        <Text>Total Sold: {highestCount}</Text>
      </div>
    </Card>
  );
}
