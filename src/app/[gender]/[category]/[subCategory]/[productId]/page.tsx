import React from "react";
import { products } from "@/lib/drizzleTest";
import { Product } from "@/lib/type";
import { Select } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: { productId: string };
}

export default function Page({ params }: PageProps) {
  const getProductById = (productId: string): Product | undefined => {
    return products.docs.find(
      (product) => product.id.toString() === productId
    ) as Product | undefined;
  };

  const specificProduct = getProductById(params.productId);
  if (!specificProduct) return null;

  const uniqueColors = specificProduct.variations.reduce(
    (colors: Set<string>, variation) => {
      colors.add(variation.color.Color);
      return colors;
    },
    new Set<string>()
  );

  return (
    <div className="container mx-auto p-4 w-screen h-screen overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-start p-2 pt-12">
        <div className="min-w-[300px] md:w-1/2">
          <div className="flex-shrink-0 relative md:h-screen overflow-scroll no-scrollbar gap-4 flex flex-row md:flex-col pb-8">
            {specificProduct.images.map((image, index) => (
              <Image
                key={index}
                width={800}
                height={800}
                src={image.imageUrl}
                alt={image.altText}
                className="rounded-lg shadow-md"
              />
            ))}
          </div>
          <div className="relative md:none md:bottom-1/2 md:left-4 md:right-0 flex md:w-20 gap-2 md:flex-col w-screen overflow-y-auto ">
            {specificProduct.images.map((image, index) => (
              <Image
                key={index}
                src={image.imageUrl}
                alt={`Thumbnail ${index}`}
                width={100}
                height={100}
                className="rounded-lg shadow-sm w-12 h-12 md:w-20 md:h-20"
              />
            ))}
          </div>
        </div>
        <div className="mt-4 md:mt-0 md:ml-6 min-w-[200px]">
          <h1 className="text-2xl font-bold mb-2">{specificProduct.title}</h1>
          <p className="text-gray-700">{specificProduct.description}</p>
          <div className="mt-3">
            <span className="text-lg font-semibold">Price: </span>
            {specificProduct.price} sek
          </div>
          <div className="mt-2">
            <span className="text-lg font-semibold">Category:</span>{" "}
            {specificProduct.category.title}
          </div>
          <div className="mt-2">
            <div className="flex flex-row gap-2 items-center">
              <span className="text-lg font-semibold text-center">Sizes:</span>
              <ToggleGroup type="single">
                {specificProduct.variations.map((variation) => (
                  <ToggleGroupItem
                    key={variation.id}
                    value={variation.size.Size}
                    className="border w-10"
                  >
                    {variation.size.Size}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>
          <div className="mt-2 flex flex-row items-center">
            <span className="text-lg font-semibold pr-2">Colors: </span>
            <ToggleGroup type="single">
              {Array.from(uniqueColors).map((color, index) => (
                <ToggleGroupItem
                  key={index}
                  value={color}
                  className={`border-2 rounded-full hover:border-zinc-100 ${
                    index === 0 ? "border-zinc-500" : "border-zinc-900"
                  }
                w-8 h-8 p-0`}
                >
                  <div
                    className="flex flex-row w-full h-full rounded-full justify-center items-center"
                    style={{
                      backgroundColor: specificProduct.variations[0].color.hex,
                    }}
                  ></div>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <Button className="mt-4 ">Add to cart</Button>
        </div>
      </div>
    </div>
  );
}
