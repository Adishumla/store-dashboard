"use client";
import getPayloadClient from "@/payload/payloadClient";
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "@tremor/react";
import { useEffect, useState } from "react";

type Item = {
  id: number;
  quantity: number;
  product: {
    title: string;
  };
};

type Order = {
  id: number;
  status: string;
  /* user?: {
    email: string;
  }; */
  user: string;
  items: Item[];
  total: number;
  updatedAt: string;
  createdAt: string;
};

type OrdersProps = {
  orders: {
    docs: Order[];
  };
};

export default function Orders({ orders }: OrdersProps) {
  const [value, setValue] = useState(null);
  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Order ID</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Customer</TableHeaderCell>
            <TableHeaderCell>Product</TableHeaderCell>
            <TableHeaderCell>Total</TableHeaderCell>
            <TableHeaderCell>Updated At</TableHeaderCell>
            <TableHeaderCell>Created At</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.docs.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.user || "Guest"}</TableCell>
              <TableCell>
                {order.items.length === 0 ? (
                  <div>empty</div>
                ) : (
                  order.items.map((item) => (
                    <div key={item.id}>
                      {item.quantity} x {item.product.title}
                    </div>
                  ))
                )}
              </TableCell>
              <TableCell>{order.total as number}</TableCell>
              <TableCell>{order.updatedAt as string}</TableCell>
              <TableCell>{order.createdAt as string}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/*       <pre>{JSON.stringify(orders, null, 2)}</pre>
       */}
    </>
  );
}
