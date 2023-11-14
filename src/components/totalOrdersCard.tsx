import { Card } from "./ui/card";
import { Metric, Text } from "@tremor/react";
import { Document } from "payload/types";

export default function TotalOrdersCard({ docs }: { docs: Document[] }) {
  const totalOrders = docs.length; // Total number of orders

  return (
    <Card className="flex flex-col gap-2 w-64 p-4">
      <div className="flex flex-row justify-between">
        <Text>Total Orders</Text>
      </div>
      <Metric>{totalOrders}</Metric> {/* Display total number of orders */}
    </Card>
  );
}
