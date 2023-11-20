import React from "react";
import ProductCard from "@/components/productCard";
import { products } from "@/lib/drizzleTest";
import { Product } from "@/lib/type";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PageProps {
  params: { gender: string };
}

export default function Page({ params }: PageProps) {
  const getProductsByGender = (gender: string): Product[] => {
    return products.docs.filter(
      (product) => product.gender === gender.toLowerCase()
    ) as unknown as Product[];
  };

  const specificProducts = getProductsByGender(params.gender);
  if (!specificProducts.length)
    return <p>No products found for this gender.</p>;

  return (
    <>
      {specificProducts.map((product) => (
        <Button key={product.id}>
          <Link href={`${product.gender}/${product.category.title}`}>
            {product.category.title}
          </Link>
        </Button>
      ))}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {specificProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product as unknown as Product}
          />
        ))}
      </div>
    </>
  );
}
