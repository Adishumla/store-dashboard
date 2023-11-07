"use client";
import { LineChart } from "@tremor/react";
import { format } from "date-fns";

const valueFormatter = (number: any) =>
  new Intl.NumberFormat("sv-SE", { style: "currency", currency: "SEK" }).format(
    number
  );

const getMonthYear = (date: any) => format(new Date(date), "yyyy-MM");

const aggregateMonthlySales = (orders: any) => {
  const monthlySales = orders.docs.reduce((acc: any, order: any) => {
    const monthYear = getMonthYear(order.orderDate);
    if (!acc[monthYear]) {
      acc[monthYear] = 0;
    }
    acc[monthYear] += order.total;
    return acc;
  }, {});

  const sortedKeys = Object.keys(monthlySales).sort();

  return sortedKeys.map((monthYear) => ({
    name: monthYear,
    sales: monthlySales[monthYear],
  }));
};

const LineMonthlySales = ({ orders }: any) => {
  const chartData = aggregateMonthlySales(orders);

  return (
    <LineChart
      yAxisWidth={100}
      curveType="monotone"
      className=" p-1"
      data={chartData}
      categories={["sales"]}
      index="name"
      valueFormatter={valueFormatter}
      colors={["indigo"]}
      showAnimation={true}
    />
  );
};

export default LineMonthlySales;
