import { Card } from "./ui/card";
import { Metric, Text, BadgeDelta, DeltaType } from "@tremor/react";
import { Document } from "payload/types";

export default function TotalSales({ docs }: { docs: Document[] }) {
  const totalSum = docs.reduce((acc, order) => acc + order.total, 0);

  const previousMonthTotal = 1000;
  const percentageChange =
    ((totalSum - previousMonthTotal) / previousMonthTotal) * 100;

  const deltaType =
    percentageChange > 0 ? "moderateIncrease" : "moderateDecrease";

  return (
    <Card className="flex flex-col gap-2 w-64 p-4">
      <div className="flex flex-row justify-between">
        <Text>Total Sales</Text>
      </div>
      <Metric>{totalSum.toFixed(2)}</Metric>
      <div className="flex flex-row justify-between items-center">
        <BadgeDelta
          deltaType={deltaType}
          isIncreasePositive={percentageChange > 0}
          size="xs"
        >
          {percentageChange.toFixed(2)}%
        </BadgeDelta>

        <Text className="text-center">to previous month</Text>
      </div>
    </Card>
  );
}
