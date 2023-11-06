"use client";
import React, { useEffect, useState } from "react";
import { DonutChart } from "@tremor/react";
import { prepareDonutData } from "@/lib/prepareDonutData";
import getOrdersBetweenDates from "@/lib/calculateSales";
import { DatePickerWithRange } from "@/components/ui/dateRangePicker";
import { DateRange } from "react-day-picker";
import { format, subDays } from "date-fns";

const valueFormatter = (number: number | bigint) =>
  new Intl.NumberFormat("sv-SE", { style: "currency", currency: "SEK" }).format(
    number
  );

interface DonutProps {
  orders: any; // replace
}

export default function Donut({ orders }: DonutProps) {
  const [value, setValue] = useState(null);
  const [startDate, setStartDate] = useState(
    format(subDays(new Date(), 30), "yyyy-MM-dd")
  );

  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [ordersBetweenDates, setOrdersBetweenDates] = useState(() =>
    getOrdersBetweenDates(startDate, endDate, orders)
  );
  console.log(startDate, endDate);
  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getOrdersBetweenDates(
        startDate,
        endDate,
        orders
      );
      setOrdersBetweenDates(fetchedOrders);
    };

    fetchOrders();
  }, [startDate, endDate, orders]);

  const cities = prepareDonutData(ordersBetweenDates);

  const handleDateChange = (range: DateRange | undefined) => {
    if (range?.from && range.to) {
      const start = format(range.from, "yyyy-MM-dd");
      const end = format(range.to, "yyyy-MM-dd");
      setStartDate(start);
      setEndDate(end);
    }
  };

  return (
    <>
      <DonutChart
        className="mt-6"
        data={cities}
        valueFormatter={valueFormatter}
        onValueChange={(v) => setValue(v)}
        category="sales"
        showAnimation={true}
        index="name"
        colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
      />
      <DatePickerWithRange onDateChange={handleDateChange} />
    </>
  );
}
