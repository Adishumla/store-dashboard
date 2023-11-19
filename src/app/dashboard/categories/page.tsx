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
import { DataTable } from "@/components/table";
import { BarChart } from "@tremor/react";
import MostPopularCategory from "@/components/mostPopularCategory";
import MostRecentlySoldCategory from "@/components/mostRecentlySoldCategory";
import CategoryMonthlySales from "@/components/areaChart";

interface Acc {
  [key: string]: { count: number; total: number };
}

const categories = orders.docs.reduce((acc: Acc, order: any) => {
  order.items.forEach((item: Item) => {
    const categoryTitle: string = item.product?.category.title;
    if (!acc[categoryTitle]) {
      acc[categoryTitle] = { count: 0, total: 0 };
    }
    acc[categoryTitle].count += item.quantity;
    acc[categoryTitle].total += item.product?.price * item.quantity;
  });
  return acc;
}, {});

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
            index="category"
            colors={["indigo"]}
            showAnimation={true}
          />
        </Card>
        <Card className="mt-2 w-[600px] h-[320px]">
          <BarChart
            data={categoriesData}
            yAxisWidth={100}
            className=" p-1"
            index="category"
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
