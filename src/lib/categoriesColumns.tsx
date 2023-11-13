"use client";
import { ColumnDef } from "@tanstack/react-table";
import react from "react";
import { Document } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";

export const categoriesColumns: ColumnDef<Document>[] = [
  {
    accessorKey: "category",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Category
        <CaretSortIcon
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "transform rotate-180" : ""
          }`}
        />
      </Button>
    ),
  },
  {
    accessorKey: "count",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Count
        <CaretSortIcon
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "transform rotate-180" : ""
          }`}
        />
      </Button>
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total
        <CaretSortIcon
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "transform rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: (info) => {
      const value = info.getValue<number>();
      return new Intl.NumberFormat("sv-SE", {
        style: "currency",
        currency: "SEK",
      }).format(value);
    },
  },
];
