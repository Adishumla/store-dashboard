"use client";
import { ColumnDef } from "@tanstack/react-table";
import react from "react";
import { Document } from "@/lib/type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<Document>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <CaretSortIcon
            className={`ml-2 h-4 w-4 ${
              column.getIsSorted() === "asc" ? "transform rotate-180" : ""
            }`}
          />
        </Button>
      );
    },
    /* make a cell where id is centered */
    cell: (info) => {
      const value = info.getValue<string>();
      return <span className="flex justify-center">{value}</span>;
    },
  },
  {
    accessorKey: "user",
    header: "Customer",
    /* header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }, */
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <CaretSortIcon
            className={`ml-2 h-4 w-4 ${
              column.getIsSorted() === "asc" ? "transform rotate-180" : ""
            }`}
          />{" "}
        </Button>
      );
    },
    cell: (info) => {
      const value = info.getValue<number>();
      return new Intl.NumberFormat("sv-SE", {
        style: "currency",
        currency: "SEK",
      }).format(value);
    },
  },
  {
    accessorKey: "items",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Items
          <CaretSortIcon
            className={`ml-2 h-4 w-4 ${
              column.getIsSorted() === "asc" ? "transform rotate-180" : ""
            }`}
          />{" "}
        </Button>
      );
    },
    cell: (info) => (
      <ul>
        {info.getValue<Document[]>().map((item: Document, index: number) => {
          const variation = item.product.variations.find(
            (v: { _order: { toString: () => any } }) =>
              v._order.toString() === item.variationId
          );
          return (
            <li key={index}>
              {item.product.title} - Qty: {item.quantity}
              {/* Display variation details if found */}
              {variation && (
                <span>
                  {" "}
                  - Size: {variation.size}, Color: {variation.color}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    ),
  },
  {
    accessorKey: "city",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          City
          <CaretSortIcon
            className={`ml-2 h-4 w-4 ${
              column.getIsSorted() === "asc" ? "transform rotate-180" : ""
            }`}
          />{" "}
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <CaretSortIcon
            className={`ml-2 h-4 w-4 ${
              column.getIsSorted() === "asc" ? "transform rotate-180" : ""
            }`}
          />{" "}
        </Button>
      );
    },
  },
  {
    accessorKey: "orderDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <CaretSortIcon
            className={`ml-2 h-4 w-4 ${
              column.getIsSorted() === "asc" ? "transform rotate-180" : ""
            }`}
          />{" "}
        </Button>
      );
    },

    cell: (info) => {
      const date = new Date(info.getValue() as string);
      const formattedDate = date.toLocaleDateString("sv-SE", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "shippingMethod",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Shipping
          <CaretSortIcon
            className={`ml-2 h-4 w-4 ${
              column.getIsSorted() === "asc" ? "transform rotate-180" : ""
            }`}
          />{" "}
        </Button>
      );
    },
  },
  {
    accessorKey: "shippingAddress",
    header: "Address",
  },
  {
    accessorKey: "billingAddress",
    header: "Billing",
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const payment = row.id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
