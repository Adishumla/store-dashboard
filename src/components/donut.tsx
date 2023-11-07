"use client";
import React, { use, useEffect, useState } from "react";
import { DonutChart, List, ListItem, BadgeDelta } from "@tremor/react";
import { prepareDonutData } from "@/lib/prepareDonutData";
import getOrdersBetweenDates from "@/lib/calculateSales";
import { DatePickerWithRange } from "@/components/ui/dateRangePicker";
import { DateRange } from "react-day-picker";
import { format, subDays } from "date-fns";
import { any } from "zod";

const valueFormatter = (number: number) =>
  new Intl.NumberFormat("sv-SE", { style: "currency", currency: "SEK" }).format(
    number
  );

const Dashboard = ({ orders }: any) => {
  const [value, setValue] = useState(null);
  const [startDate, setStartDate] = useState(
    format(subDays(new Date(), 30), "yyyy-MM-dd")
  );
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [ordersBetweenDates, setOrdersBetweenDates] = useState(() =>
    getOrdersBetweenDates(startDate, endDate, orders)
  );

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

  const filteredData = value
    ? cities.filter((city) => city.name === (value as { name: string }).name)
    : cities;

  useEffect(() => {
    console.log("filteredData", filteredData);
  }, [filteredData]);

  return (
    <>
      <div className="flex flex-row h-full">
        <div className="grid grid-cols-1 content-between">
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
        </div>
        <div className="flex-1">
          <List className="mt-6 pr-4">
            {filteredData.map((city: any) => (
              <ListItem key={city.name}>
                {city.name}
                <BadgeDelta size="xs">{city.sales} sek</BadgeDelta>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
