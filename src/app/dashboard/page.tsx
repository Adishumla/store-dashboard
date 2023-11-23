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
import { orders } from "@/lib/drizzleTest";
import Donut from "@/components/donut";
import TotalSales from "@/components/totalSales";
import getOrdersBetweenDates from "@/lib/calculateSales";
import LineMonthlySales from "@/components/lineMonthlySales";
import { DataTable } from "@/components/table";
import { ColumnDef } from "@tanstack/react-table";
import { columns } from "@/lib/ordersColumns";
import { Document, RootObject } from "@/lib/type";
import TotalOrdersCard from "@/components/totalOrdersCard";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 my-2">
      <div className="flex flex-col md:flex-row gap-4">
        <TotalSales docs={orders.docs as unknown as Document[]} />
        <TotalOrdersCard docs={orders.docs as unknown as Document[]} />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="w-full md:w-1/2 h-full flex justify-center items-center">
          <LineMonthlySales orders={orders} />
        </Card>
        <Card className="w-full md:w-1/2 h-auto md:h-[320px]">
          <Donut orders={orders} />
        </Card>
      </div>

      <Card className="mt-6">
        <DataTable
          columns={columns}
          data={orders.docs as unknown as Document[]}
        />
      </Card>
    </div>
  );
}
