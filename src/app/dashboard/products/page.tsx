import React from "react";
import { orders } from "@/lib/drizzleTest";
import { Document, Item, RootObject, Product } from "@/lib/type";
import { productsColumns } from "@/lib/productsColumns";
import { DataTable } from "@/components/table2";
import { BarChart } from "@tremor/react";
import ProductsBarChart from "@/components/productsBarChart";
import MostPopularProduct from "@/components/MostPopularProduct";
import MostPopularVariant from "@/components/mostPopularVariant";
import { Card } from "@/components/ui/card";

const aggregateProducts = (orders: Document[]) => {
  const productsMap = new Map();

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const product = item.product;
      const existingProduct = productsMap.get(product.id);

      if (existingProduct) {
        existingProduct.totalPurchases += item.quantity;
        existingProduct.totalSales += item.quantity * product.price;
      } else {
        productsMap.set(product.id, {
          ...product,
          totalPurchases: item.quantity,
          totalSales: item.quantity * product.price,
        });
      }
    });
  });

  return Array.from(productsMap.values());
};

const productsData = aggregateProducts(orders.docs as unknown as Document[]);

export default function Products() {
  return (
    <>
      <div className="flex flex-row gap-1 my-1">
        <MostPopularProduct docs={orders.docs as unknown as Document[]} />
        <MostPopularVariant docs={orders.docs as unknown as Document[]} />
      </div>
      <Card className="mt-2 h-[320px]">
        <ProductsBarChart products={productsData as unknown as Product[]} />
      </Card>
      <Card className="mt-2">
        <DataTable
          columns={productsColumns}
          data={productsData as unknown as Product[]}
          filterColumnName="title"
        />
      </Card>
    </>
  );
}
