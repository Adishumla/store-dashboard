import { Card } from "./ui/card";
import { Metric, Text, BadgeDelta, DeltaType } from "@tremor/react";
import { Document } from "payload/types";

export default function TotalSales({ docs }: { docs: Document[] }) {
  const totalSum = docs.reduce((acc, order) => acc + order.total, 0);

  return (
    <Card className="flex flex-col gap-2 w-64 p-4">
      <div className="flex flex-row justify-between">
        <Text>Total Sales</Text>
      </div>
      <Metric>{totalSum.toFixed(2)}</Metric>
    </Card>
  );
}
