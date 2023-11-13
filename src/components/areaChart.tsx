"use client";
import React from "react";
import { AreaChart } from "@tremor/react";
import { format } from "date-fns";
import { Document, Item } from "@/lib/type";
import { Card } from "./ui/card";

interface CategoryMonthlySalesProps {
  orders: Document[];
}

const CategoryMonthlySales = ({ orders }: CategoryMonthlySalesProps) => {
  const [value, setValue] = React.useState<any>(null);
  const getMonthYear = (date: string) => format(new Date(date), "yyyy-MM");

  const salesByMonth = orders.reduce((acc: any, order) => {
    const monthYear = getMonthYear(order.orderDate);
    order.items.forEach((item: Item) => {
      const category = item.product.category.title;
      if (!acc[monthYear]) {
        acc[monthYear] = {};
      }
      if (!acc[monthYear][category]) {
        acc[monthYear][category] = 0;
      }
      acc[monthYear][category] += item.quantity * item.product.price;
    });
    return acc;
  }, {});

  let chartData: any[] = [];
  Object.keys(salesByMonth).forEach((monthYear) => {
    let monthData: { [key: string]: any } = { name: monthYear };
    Object.keys(salesByMonth[monthYear]).forEach((category) => {
      monthData[category] = salesByMonth[monthYear][category];
    });
    chartData.push(monthData);
  });

  const categories = Array.from(
    new Set(
      orders.flatMap((order) =>
        order.items.map((item) => item.product.category.title)
      )
    )
  );

  return (
    <Card className="flex flex-col gap-2  p-4">
      <AreaChart
        data={chartData}
        categories={categories}
        index="name"
        yAxisWidth={100}
        onValueChange={(v) => setValue(v)}
        colors={["indigo", "green", "red", "yellow", "blue", "purple"]}
        showAnimation={true}
      />
    </Card>
  );
};

export default CategoryMonthlySales;
