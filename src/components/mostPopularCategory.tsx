import { any } from "zod";
import { Card } from "./ui/card";
import { Text, Metric } from "@tremor/react";
import { Document, Item, Category } from "@/lib/type";

export default function MostPopularCategory({ docs }: { docs: Document[] }) {
  const categoryCounts = docs.reduce(
    (acc: Record<string, number>, order: Document) => {
      order.items.forEach((item: Item) => {
        const categoryTitle: string = item.product.category.title;
        if (!acc[categoryTitle]) {
          acc[categoryTitle] = 0;
        }
        acc[categoryTitle] += item.quantity;
      });
      return acc;
    },
    {}
  );

  let mostPopularCategory = "";
  let highestCount = 0;

  for (const [category, count] of Object.entries(categoryCounts)) {
    if (count > highestCount) {
      mostPopularCategory = category;
      highestCount = count;
    }
  }

  return (
    <Card className="flex flex-col gap-2 w-64 p-4">
      <div className="flex flex-row justify-between">
        <Text>Most Popular Category</Text>
      </div>
      <Metric>{mostPopularCategory}</Metric>
      <div className="flex flex-row justify-between items-center">
        <Text>Total Items Sold: {highestCount}</Text>
      </div>
    </Card>
  );
}
