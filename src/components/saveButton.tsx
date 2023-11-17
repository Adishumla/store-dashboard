"use client";
import { useState } from "react";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export default function SaveButton() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Button
      className="mt-4 text-black"
      variant={"outline"}
      onClick={() => setIsClicked(!isClicked)}
    >
      {isClicked ? (
        <HeartFilledIcon className="w-6 h-6" />
      ) : (
        <HeartIcon className="w-6 h-6" />
      )}
    </Button>
  );
}
