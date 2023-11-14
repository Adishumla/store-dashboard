"use client";
import { BarChart } from "@tremor/react";
import { Product } from "@/lib/type";
import Image from "next/image";

const valueFormatter = (number: number | bigint) =>
  new Intl.NumberFormat("sv-SE", { style: "currency", currency: "SEK" }).format(
    number
  );

export default function ProductsBarChart({
  products,
}: {
  products: Product[];
}) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const product = products.find((product) => product.title === label);

      const imageUrl = product?.images?.[0]?.imageUrl || "";
      const altText = product?.images?.[0]?.altText || "Product Image";

      return (
        <div className="text-sm shadow-lg rounded-lg bg-gray-800 text-white p-3 w-42 h-48">
          <div className="flex justify-center">
            {imageUrl && (
              <Image
                src={imageUrl}
                className="w-28 h-28 rounded"
                alt={altText}
                width={112}
                height={112}
              />
            )}
          </div>
          <p className="font-bold">{label}</p>
          <p>{`Sales: ${valueFormatter(payload[0].value)}`}</p>
        </div>
      );
    }

    return null;
  };
  return (
    <BarChart
      data={products}
      yAxisWidth={100}
      className=" p-1"
      index="title"
      categories={["totalSales"]}
      colors={["indigo"]}
      customTooltip={CustomTooltip}
      showAnimation={true}
    />
  );
}
