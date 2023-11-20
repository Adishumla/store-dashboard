import { useState } from "react";
import Image from "next/image";

export default function navImage({ specificProduct }: any) {
  return (
    <>
      {specificProduct.images.map((image: any, index: any) => (
        <Image
          key={index}
          src={image.imageUrl}
          alt={`Thumbnail ${index}`}
          width={100}
          height={100}
        />
      ))}
    </>
  );
}
