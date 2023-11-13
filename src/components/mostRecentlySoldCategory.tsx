import { Card } from "./ui/card";
import { Text, Metric } from "@tremor/react";
import { Document, Item } from "@/lib/type"; // Adjust the import path as necessary

export default function MostRecentlySoldCategory({
  docs,
}: {
  docs: Document[];
}) {
  if (docs.length === 0) {
    return (
      <Card className="flex flex-col gap-2 w-64 p-4">
        <div className="flex flex-row justify-between">
          <Text>Most Recently Sold Category</Text>
        </div>
        <Metric>No sales data available</Metric>
      </Card>
    );
  }

  // Sort the documents by orderDate in descending order
  const sortedDocs = [...docs].sort(
    (a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
  );

  // Find the category of the first item in the most recent order
  const mostRecentOrder = sortedDocs[0];
  const mostRecentlySoldCategory =
    mostRecentOrder.items[0]?.product.category.title;

  return (
    <Card className="flex flex-col gap-2 w-64 p-4">
      <div className="flex flex-row justify-between">
        <Text>Most Recently Sold Category</Text>
      </div>
      <Metric>{mostRecentlySoldCategory || "N/A"}</Metric>
    </Card>
  );
}
