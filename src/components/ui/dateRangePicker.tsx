"use client";
import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format, sub, subDays } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DatePickerWithRangeProps {
  className?: string;
  onDateChange: (range: DateRange | undefined) => void; // callback for when date changes
}

export function DatePickerWithRange({
  className,
  onDateChange,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: subDays(new Date(), 30),
  });

  const handleDateSelect = (newDate: DateRange | undefined) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                `${format(date.from, "LLL dd, y")} - ${format(
                  date.to,
                  "LLL dd, y"
                )}`
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Select
            onValueChange={(value) => {
              const today = new Date();
              const startOfWeek = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() - today.getDay()
              );
              const startOfMonth = new Date(
                today.getFullYear(),
                today.getMonth(),
                1
              );
              const startOfYear = new Date(today.getFullYear(), 0, 1);

              if (value === "0") {
                handleDateSelect({
                  from: startOfMonth,
                  to: today,
                });
              } else if (value === "1") {
                handleDateSelect({
                  from: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
                  to: today,
                });
              } else if (value === "2") {
                handleDateSelect({
                  from: startOfWeek,
                  to: today,
                });
              } else if (value === "3") {
                handleDateSelect({
                  from: startOfYear,
                  to: today,
                });
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="0">This month</SelectItem>
              <SelectItem value="1">Last 30 days</SelectItem>
              <SelectItem value="2">This week</SelectItem>
              <SelectItem value="3">This year</SelectItem>
            </SelectContent>
          </Select>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
