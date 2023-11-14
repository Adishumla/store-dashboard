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
import getOrdersBetweenDates from "@/lib/calculateSales";
import LineMonthlySales from "@/components/lineMonthlySales";
import { DataTable } from "@/components/table2";
import { ColumnDef } from "@tanstack/react-table";
import { columns } from "@/lib/ordersColumns";
import { Document, RootObject } from "@/lib/type";
import TotalOrdersCard from "@/components/totalOrdersCard";

export default function Dashboard() {
  return (
    <div>
      <div className="flex flex-row gap-4 my-2">
        <TotalSales docs={orders.docs as unknown as Document[]} />
        <TotalOrdersCard docs={orders.docs as unknown as Document[]} />
      </div>
      <div className="flex gap-4">
        <Card className="w-[600px] h-full flex justify-center items-center">
          <LineMonthlySales orders={orders} />
        </Card>
        <Card className="w-[600px] h-[320px]">
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
