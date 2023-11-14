import React from "react";
import ProductCard from "@/components/productCard";
import { Product } from "@/lib/type";
import { products } from "@/lib/drizzleTest";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-100">test</h1>
      <p className="text-slate-100">Some test content</p>
      {products.docs.map((product) => (
        <ProductCard key={product.id} product={product as unknown as Product} />
      ))}
    </div>
  );
}
