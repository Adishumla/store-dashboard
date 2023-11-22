"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/lib/type";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductCard from "./productCard";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

interface PageProps {
  params: { gender: string; category?: string };
}

interface FilterProductCardsProps {
  specificProducts: Product[];
  colors: string[];
  sizes: string[];
  category?: string | string[];
  isGenderPage?: boolean;
}

function transformToProduct(item: unknown): Product | null {
  return item as Product;
}

const FilterProductCards: React.FC<FilterProductCardsProps> = ({
  specificProducts,
  colors,
  sizes,
  category,
  isGenderPage = false,
}) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const router = useRouter();

  const handleColorChange = (color: string) => {
    setSelectedColor(color === "All" ? "" : color);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size === "All" ? "" : size);
  };

  const handleSubCategoryChange = (subCategory: string) => {
    if (subCategory === "All") {
      router.back();
    } else {
      router.push(`${category}/${subCategory}`);
    }
  };

  const uniqueSubCategories = specificProducts.reduce<Product[]>(
    (unique, product) => {
      if (product.subCategory && product.subCategory.title) {
        const isExisting = unique.some(
          (item) =>
            item.subCategory &&
            item.subCategory.title === product.subCategory.title
        );
        if (!isExisting) {
          unique.push(product);
        }
      }
      return unique;
    },
    []
  );

  const uniqueColors = Array.from(
    new Set(
      specificProducts.flatMap((product) =>
        product.variations.map((variation) => variation.color.Color)
      )
    )
  );
  const uniqueSizes = Array.from(
    new Set(
      specificProducts.flatMap((product) =>
        product.variations.map((variation) => variation.size.Size)
      )
    )
  );

  const uniqueCategories = Array.from(
    new Set(specificProducts.map((product) => product.category.title))
  );
  const handleCategoryChange = (category: string) => {
    if (category === "All") {
      router.back();
    } else {
      router.push(`${location.pathname}/${category}`);
    }
  };

  const filteredProducts = specificProducts.filter((product) => {
    const hasMatchingColor = product.variations.some((variation) =>
      selectedColor ? variation.color.Color === selectedColor : true
    );
    const hasMatchingSize = product.variations.some((variation) =>
      selectedSize ? variation.size.Size === selectedSize : true
    );
    return hasMatchingColor && hasMatchingSize;
  });

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 md:gap-4 justify-center items-center mt-16">
          <Select
            onValueChange={
              isGenderPage ? handleCategoryChange : handleSubCategoryChange
            }
          >
            <SelectTrigger className="max-w-[180px]">
              <SelectValue placeholder={isGenderPage ? "Category" : "Style"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{isGenderPage ? "Category" : "Style"}</SelectLabel>
                <SelectItem key="all-categories" value="All">
                  All
                </SelectItem>
                {isGenderPage
                  ? uniqueCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))
                  : uniqueSubCategories.map((product) => (
                      <SelectItem
                        key={product.id}
                        value={product.subCategory.title}
                      >
                        {product.subCategory.title}
                      </SelectItem>
                    ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={handleColorChange}>
            <SelectTrigger className="max-w-[180px]">
              <SelectValue placeholder="Colors" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Colors</SelectLabel>
                <SelectItem key="all-colors" value="All">
                  All
                </SelectItem>
                {uniqueColors.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={handleSizeChange}>
            <SelectTrigger className="max-w-[180px]">
              <SelectValue placeholder="Sizes" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sizes</SelectLabel>
                <SelectItem key="all-sizes" value="All">
                  All
                </SelectItem>
                {uniqueSizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Separator className="my-8 mx-0" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-2">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default FilterProductCards;
