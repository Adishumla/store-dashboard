import React from "react";
import ProductCard from "@/components/productCard";
import { Product } from "@/lib/type";
import { products } from "@/lib/drizzleTest";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.docs.map((product) => (
        <ProductCard key={product.id} product={product as unknown as Product} />
      ))}
    </div>
  );
}
