import React from "react";
import ProductCard from "@/components/productCard";
import { products } from "@/lib/drizzleTest";
import { Product } from "@/lib/type";
import FilterProductCards from "@/components/filterProductCards";

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

  if (!specificProducts.length) {
    return <p>No products found for this category.</p>;
  }

  const colorSet = new Set<string>();
  const sizeSet = new Set<string>();

  specificProducts.forEach((product) => {
    product.variations.forEach((variation) => {
      colorSet.add(variation.color.Color);
      sizeSet.add(variation.size.Size);
    });
  });

  const uniqueColors = Array.from(colorSet);
  const uniqueSizes = Array.from(sizeSet);

  return (
    <FilterProductCards
      specificProducts={specificProducts}
      colors={uniqueColors}
      sizes={uniqueSizes}
      category={params.subCategory}
      isGenderPage={false}
    />
  );
}
