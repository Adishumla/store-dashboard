import React from "react";
import { products } from "@/lib/drizzleTest";
import { Product } from "@/lib/type";
import FilterProductCards from "@/components/filterProductCards";

interface PageProps {
  params: { gender: string };
}

export default function Page({ params }: PageProps) {
  const getProductsByGender = (gender: string): Product[] => {
    return (products.docs as unknown as Product[]).filter(
      (product) => product.gender === gender.toLowerCase()
    );
  };

  const specificProducts = getProductsByGender(params.gender);
  if (!specificProducts.length) {
    return <p>No products found for this gender.</p>;
  }

  const categorySet = new Set<string>();
  const colorSet = new Set<string>();
  const sizeSet = new Set<string>();

  specificProducts.forEach((product) => {
    if (
      product.category &&
      product.category.title &&
      !categorySet.has(product.category.title)
    ) {
      categorySet.add(product.category.title);
    }
    product.variations.forEach((variation) => {
      colorSet.add(variation.color.Color);
      sizeSet.add(variation.size.Size);
    });
  });

  const uniqueCategories = Array.from(categorySet);
  const uniqueColors = Array.from(colorSet);
  const uniqueSizes = Array.from(sizeSet);

  return (
    <FilterProductCards
      specificProducts={specificProducts}
      colors={uniqueColors}
      sizes={uniqueSizes}
      category={uniqueCategories}
      isGenderPage={true}
    />
  );
}
