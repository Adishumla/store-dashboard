import React from "react";
import { products } from "@/lib/drizzleTest";
import { Product } from "@/lib/type";
import { Select } from "@/components/ui/select";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle";
import Image from "next/image";

interface PageProps {
  params: { "product-id": string };
}

export default function Page({ params }: PageProps) {
  const getProductById = (productId: string): Product | undefined => {
    return products.docs.find(
      (product) => product.id.toString() === productId
    ) as Product | undefined;
  };

  const specificProduct = getProductById(params["product-id"]);

  if (!specificProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4 w-screen h-screen">
      <div className="flex flex-col md:flex-row md:items-start">
        <div className="flex-shrink-0">
          <Image
            width={800}
            height={800}
            src={specificProduct.images[0]?.imageUrl}
            alt={specificProduct.images[0]?.altText}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="mt-4 md:mt-0 md:ml-6">
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
              {specificProduct.variations.map((variation) => (
                <ToggleGroup
                  key={variation.id}
                  type="single"
                  value={variation.size.Size}
                >
                  <Toggle value={variation.size.Size} className="border w-10">
                    {variation.size.Size}
                  </Toggle>
                </ToggleGroup>
              ))}
            </div>
          </div>
          <div className="mt-2 flex flex-row">
            <span className="text-lg font-semibold">Colors:</span>
            <span
              className="flex flex-row mx-2 w-6 h-6 justify-center items-center rounded-full transition-colors duration-100 border-[0.1px] border-zinc-900"
              style={{
                backgroundColor: specificProduct.variations[0].color.hex,
              }}
            >
              {/*  {specificProduct.variations[0].color.Color} */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
