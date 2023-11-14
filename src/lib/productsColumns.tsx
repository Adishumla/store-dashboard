"use client";
import { ColumnDef } from "@tanstack/react-table";
import react from "react";
import { Document, Item, Product, Variation } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import {
  TableCell,
  TableHeader,
  TableRow,
  Table,
  TableBody,
} from "@/components/ui/table";

export const productsColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "title",
    header: "Product Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "totalPurchases",
    header: "Total Sold",
  },
  {
    accessorKey: "totalSales",
    header: "Total Revenue",
    cell: (info) => {
      return new Intl.NumberFormat("sv-SE", {
        style: "currency",
        currency: "SEK",
      }).format(info.getValue<number>());
    },
  },
  {
    accessorKey: "variants",
    header: "Variants",
    cell: (info) => {
      const product: Product = info.row.original;
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Size</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Stock</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {product.variations.map((variation: Variation) => (
              <TableRow key={variation.id}>
                <TableCell>{variation.size}</TableCell>
                <TableCell>{variation.color}</TableCell>
                <TableCell>{variation.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    },
  },
  {
    accessorKey: "fabric",
    header: "Fabric",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: (info) => {
      const product: Product = info.row.original;
      return product.category.title;
    },
  },
  {
    accessorKey: "subCategory",
    header: "Sub Category",
    cell: (info) => {
      const product: Product = info.row.original;
      return product.subCategory.title;
    },
  },
];
