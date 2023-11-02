import React from "react";
import { Metric, DonutChart, BarChart } from "@tremor/react";
import { Card } from "@/components/ui/card";

const cities = [
  {
    name: "New York",
    sales: 9800,
  },
  {
    name: "London",
    sales: 4567,
  },
  {
    name: "Hong Kong",
    sales: 3908,
  },
  {
    name: "San Francisco",
    sales: 2400,
  },
  {
    name: "Singapore",
    sales: 1908,
  },
  {
    name: "Zurich",
    sales: 1398,
  },
];

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Some dashboard content</p>
      <div className="grid grid-cols-2 gap-4">
        <Card className="w-[400px] h-full flex justify-center items-center">
          <BarChart
            data={cities}
            categories={["sales"]}
            index="name"
            colors={["indigo"]}
          />
        </Card>
        <DonutChart
          className="mt-6"
          data={cities}
          category="sales"
          index="name"
          colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
        />
      </div>
    </div>
  );
}
