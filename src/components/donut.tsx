"use client";
import React, { useState } from "react";
import { DonutChart } from "@tremor/react";
import { prepareDonutData } from "@/lib/prepareDonutData";

const valueFormatter = (number: number | bigint) =>
  new Intl.NumberFormat("sv-SE", { style: "currency", currency: "SEK" }).format(
    number
  );

export default function Donut({ orders }: any) {
  const [value, setValue] = React.useState(null);
  const cities = prepareDonutData(orders);
  return (
    <DonutChart
      className="mt-6"
      data={cities}
      valueFormatter={valueFormatter}
      onValueChange={(v) => setValue(v)}
      category="sales"
      index="name"
      colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
    />
  );
}
