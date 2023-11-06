import React from "react";
import {
  Metric,
  DonutChart,
  BarChart,
  LineChart,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@tremor/react";
import { Card } from "@/components/ui/card";
import CityBarChart from "@/components/CityBarChart";
import CityLineChart from "@/components/CityLineChart";
import Orders from "@/components/table";
import { orders } from "@/lib/drizzleTest";
import Donut from "@/components/donut";
import TotalSales from "@/components/totalSales";

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

const valueFormatter = (number: number | bigint) =>
  new Intl.NumberFormat("sv-SE", { style: "currency", currency: "SEK" }).format(
    number
  );

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="text-sm shadow-lg rounded-lg bg-gray-800 text-white p-3 w-42 h-48">
        <div className="flex justify-center">
          <img src="https://picsum.photos/200" className="w-28 h-28 rounded" />
        </div>
        <p className="font-bold">{label}</p>
        <p>{`Sales: ${valueFormatter(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
};

export default function Dashboard() {
  //const [value, setValue] = React.useState(null);

  return (
    <div>
      <div className="flex flex-row gap-4">
        {/* need to fix this later */}
        {/* @ts-ignore */}
        <TotalSales docs={orders.docs} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="w-[400px] h-full flex justify-center items-center">
          <BarChart
            className=""
            data={cities}
            yAxisWidth={100}
            categories={["sales"]}
            index="name"
            //valueFormatter={valueFormatter}
            colors={["indigo"]}
            //customTooltip={CustomTooltip}
            showAnimation={true}
          />
        </Card>
        <Card className="w-[400px] h-full flex justify-center items-center">
          <LineChart
            yAxisWidth={100}
            curveType="monotone"
            className=""
            data={cities}
            categories={["sales"]}
            index="name"
            //valueFormatter={valueFormatter}
            colors={["indigo"]}
            showAnimation={true}
          />
        </Card>
        <Donut orders={orders.docs} />
      </div>

      <Card className="mt-6">
        {/* need to fix this later */}
        {/* @ts-ignore */}
        <Orders orders={orders} />
      </Card>
    </div>
  );
}
