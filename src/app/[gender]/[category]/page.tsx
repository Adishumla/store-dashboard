import React from "react";
import ProductCard from "@/components/productCard";
import { products } from "@/lib/drizzleTest";
import { Product } from "@/lib/type";
import FilterProductCards from "@/components/filterProductCards";

interface PageProps {
  params: { gender: string; category?: string };
}

function transformToProduct(item: unknown): Product | null {
  return item as Product;
}

export default function Page({ params }: PageProps) {
  const getProductsByGenderAndCategory = (
    gender: string,
    category?: string
  ): Product[] => {
    return products.docs
      .map(transformToProduct)
      .filter(
        (product): product is Product =>
          product !== null &&
          product.gender.toLowerCase() === gender.toLowerCase() &&
          (!category ||
            product.category.title.toLowerCase() === category.toLowerCase())
      );
  };

  const specificProducts = getProductsByGenderAndCategory(
    params.gender,
    params.category
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
      category={params.category}
      isGenderPage={false}
    />
  );
}
