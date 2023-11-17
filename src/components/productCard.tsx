import { Product } from "@/lib/type";
import Image from "next/image";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import SaveButton from "./saveButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex w-[500px] my-2">
      <div className="flex justify-left w-fit">
        {product.images && product.images.length > 0 && (
          <Image
            className=" h-full w-full object-cover overflow-hidden"
            src={product.images[0].imageUrl}
            alt={product.images[0].altText}
            width={200}
            height={200}
          />
        )}
      </div>
      <div className="flex flex-col justify-between w-full">
        <div className="p-4">
          <h3 className="text-2xl font-light text-gray-800 truncate ">
            {product.title}
          </h3>
          {/*  <p className="text-gray-600 text-sm mt-1">{product.description}</p> */}

          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-800 subpixel-antialiased	 text-xl font-light	">
              {product.price} SEK
            </span>
          </div>

          {product.variations && product.variations.length > 0 && (
            <div className="mt-4">
              <ul className="flex flex-row text-gray-700">
                {[
                  ...new Set(
                    product.variations.map((variation) =>
                      variation.size.toUpperCase()
                    )
                  ),
                ].map((size, index) => (
                  <li key={index} className="text-sm">
                    <div className="flex flex-row mr-2 w-8 h-8 bg-zinc-900 justify-center text-white items-center rounded-lg hover:bg-zinc-700 transition-colors duration-300">
                      {size}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Separator className="mt-4" />
          <div className="flex flex-row justify-between">
            <Button className="mt-4 text-black" variant={"outline"}>
              Add to cart
            </Button>
            <SaveButton />
          </div>
        </div>
      </div>
    </div>
  );
}
