"use client";
import { Button } from "./ui/button";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-center items-center ">
        <Button
          className="m-4 absolute top-0 right-0 z-20"
          variant={"outline"}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="{2}"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center absolute right-0 top-0 z-10">
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } flex-col justify-center items-center gap-2 h-screen w-screen bg-zinc-900 p-4 `}
        >
          <Button
            variant={"link"}
            asChild
            className=" text-4xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Link
              className="text-black"
              href="/"
              onClick={() => setIsOpen(!isOpen)}
            >
              Home
            </Link>
          </Button>
          <Button
            variant={"link"}
            asChild
            className=" text-4xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Link
              className="text-black"
              href="/dashboard"
              onClick={() => setIsOpen(!isOpen)}
            >
              Dashboard
            </Link>
          </Button>
          <Button
            asChild
            variant={"link"}
            className=" text-4xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Link className="text-black" href="/test">
              Test
            </Link>
          </Button>
          <Button
            asChild
            variant={"link"}
            className=" text-4xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Link className="text-black" href="/login">
              Login
            </Link>
          </Button>
          <Button
            asChild
            variant={"link"}
            className=" text-4xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Link className="text-black" href="/register">
              Register
            </Link>
          </Button>
          <Button
            asChild
            variant={"link"}
            className=" text-4xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Link className="text-black" href="/admin">
              Admin
            </Link>
          </Button>
          <Button
            asChild
            variant={"link"}
            className=" text-4xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Link className="text-black" href="/admin/logout">
              Logout
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
