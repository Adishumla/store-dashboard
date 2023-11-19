import { Card } from "./ui/card";
import { Text, Metric, Title } from "@tremor/react";
import { Document, Item, Variation } from "@/lib/type";

export default function MostPopularVariant({ docs }: { docs: Document[] }) {
  const variantCounts = docs.reduce(
    (
      acc: Record<string, { count: number; details: string }>,
      order: Document
    ) => {
      order.items.forEach((item: Item) => {
        const variantId: number = item.variationId;
        const variant = item.product.variations.find(
          (v) => v._order === variantId
        );

        if (variant) {
          const variantKey = `${item.product.title}`;
          const variantDetails = `Size: ${variant.size.Size}, Color: ${variant.color.Color}`;

          if (!acc[variantKey]) {
            acc[variantKey] = { count: 0, details: variantDetails };
          }
          acc[variantKey].count += item.quantity;
        }
      });
      return acc;
    },
    {}
  );

  let mostPopularVariantDetails = "";
  let highestCount = 0;

  for (const [key, data] of Object.entries(variantCounts)) {
    if (data.count > highestCount) {
      mostPopularVariantDetails = `${key} (${data.details})`;
      highestCount = data.count;
    }
  }

  return (
    <Card className="flex flex-col gap-2 w-64 p-4">
      <div className="flex flex-row justify-between">
        <Text>Most Popular Variant</Text>
      </div>
      <Title className="text-base">{mostPopularVariantDetails}</Title>
      <div className="flex flex-row justify-between items-center">
        <Text>Total Sold: {highestCount}</Text>
      </div>
    </Card>
  );
}
