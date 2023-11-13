import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/loginForm";
import RegisterForm from "@/components/auth/registerForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { orders } from "@/lib/drizzleTest";
import { Document, Item, RootObject, Product } from "@/lib/type";
import { categoriesColumns } from "@/lib/categoriesColumns";
import { DataTable } from "@/components/table2";
import { BarChart } from "@tremor/react";
import MostPopularCategory from "@/components/mostPopularCategory";
import MostRecentlySoldCategory from "@/components/mostRecentlySoldCategory";
import CategoryMonthlySales from "@/components/areaChart";

interface Acc {
  [key: string]: { count: number; total: number };
}

const categories = orders.docs.reduce((acc: Acc, order: any) => {
  order.items.forEach((item: Item) => {
    const categoryTitle: string = item.product.category.title;
    if (!acc[categoryTitle]) {
      acc[categoryTitle] = { count: 0, total: 0 };
    }
    acc[categoryTitle].count += item.quantity;
    acc[categoryTitle].total += item.product.price * item.quantity;
  });
  return acc;
}, {});
const mockData = [
  {
    name: "Shirt",
    data: [
      { x: "2023-01", y: 500 },
      { x: "2023-02", y: 450 },
      { x: "2023-03", y: 600 },
      { x: "2023-04", y: 550 },
      { x: "2023-05", y: 580 },
      { x: "2023-06", y: 620 },
      { x: "2023-07", y: 610 },
      { x: "2023-08", y: 650 },
      { x: "2023-09", y: 630 },
      { x: "2023-10", y: 600 },
      { x: "2023-11", y: 670 },
      { x: "2023-12", y: 700 },
    ],
  },
  {
    name: "Pants",
    data: [
      { x: "2023-01", y: 800 },
      { x: "2023-02", y: 760 },
      { x: "2023-03", y: 820 },
      { x: "2023-04", y: 880 },
      { x: "2023-05", y: 850 },
      { x: "2023-06", y: 900 },
      { x: "2023-07", y: 950 },
      { x: "2023-08", y: 920 },
      { x: "2023-09", y: 980 },
      { x: "2023-10", y: 940 },
      { x: "2023-11", y: 1000 },
      { x: "2023-12", y: 1020 },
    ],
  },
];
export default function Categories() {
  const categoriesData = Object.keys(categories).map((key) => ({
    category: key,
    count: categories[key].count,
    total: categories[key].total,
  }));

  return (
    <div className="">
      <div className="flex flex-row gap-1 my-1">
        <MostPopularCategory docs={orders.docs as unknown as Document[]} />
        <MostRecentlySoldCategory docs={orders.docs as unknown as Document[]} />
      </div>
      <CategoryMonthlySales orders={orders.docs as unknown as Document[]} />
      <div className="flex flex-row gap-4 my-1">
        <Card className="mt-2 w-[600px] h-[320px]">
          <BarChart
            data={categoriesData}
            yAxisWidth={100}
            className=" p-1"
            categories={["count"]}
            index="count"
            colors={["indigo"]}
            showAnimation={true}
          />
        </Card>
        <Card className="mt-2 w-[600px] h-[320px]">
          <BarChart
            data={categoriesData}
            yAxisWidth={100}
            className=" p-1"
            index="total"
            categories={["total"]}
            colors={["indigo"]}
            showAnimation={true}
          />
        </Card>
      </div>
      <Card className="mt-6">
        <DataTable
          columns={categoriesColumns}
          data={categoriesData as unknown as Document[]}
          filterColumnName="category"
        />
      </Card>
    </div>
  );
}
