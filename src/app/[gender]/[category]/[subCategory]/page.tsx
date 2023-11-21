import React from "react";
import ProductCard from "@/components/productCard";
import { products } from "@/lib/drizzleTest";
import { Product } from "@/lib/type";

interface PageProps {
  params: { gender: string; category?: string; subCategory?: string };
}

function transformToProduct(item: unknown): Product | null {
  return item as Product;
}

export default function Page({ params }: PageProps) {
  const getProductsByCriteria = (
    gender: string,
    category?: string,
    subCategory?: string | undefined
  ): Product[] => {
    return products.docs
      .map(transformToProduct)
      .filter(
        (product): product is Product =>
          product !== null &&
          product.gender.toLowerCase() === gender.toLowerCase() &&
          (!category ||
            product.category.title.toLowerCase() === category.toLowerCase()) &&
          (!subCategory ||
            product.subCategory.title.toLowerCase() ===
              subCategory.toLowerCase())
      );
  };

  const specificProducts = getProductsByCriteria(
    params.gender,
    params.category,
    params.subCategory
  );
  if (!specificProducts.length)
    return <p>No products found for this category.</p>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {specificProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
