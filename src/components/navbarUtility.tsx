"use client";
import { Button } from "./ui/button";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Category } from "@/lib/type";

interface CategoryStructure {
  [gender: string]: { [category: string]: string[] };
}

interface NavbarUtilityProps {
  categories: CategoryStructure;
  userRole: string;
}

export default function NavbarUtility({
  categories,
  userRole,
}: NavbarUtilityProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(userRole === "admin");

  useEffect(() => {
    setIsAdmin(userRole === "admin");
  }, [userRole]);

  return (
    <div className="flex flex-col justify-center items-center ">
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
      <div className="flex flex-col justify-start items-start absolute right-0 top-0 z-10">
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } flex-col justify-center items-start md:items-center gap-2 h-screen w-screen bg-zinc-900 p-4 shadow-md`}
        >
          <div className="flex flex-col justify-start items-start gap-8">
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
            {isAdmin && (
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
            )}
            {/* <Button
            asChild
            variant={"link"}
            className=" text-4xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Link className="text-black" href="/test">
              Test
            </Link>
          </Button> */}
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
            {/* <Button
            asChild
            variant={"link"}
            className=" text-4xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Link className="text-black" href="/register">
              Register
            </Link>
          </Button> */}
            {isAdmin && (
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
            )}
            {/*  <div
              className={`${
                isOpen ? "flex" : "hidden"
              } flex-col justify-center items-center z-10`}
            >
              <NavigationMenu className="flex flex-col w-full">
                <NavigationMenuList className="flex flex-col items-start gap-8 bg-zinc-900 w-20">
                  {Object.entries(categories).map(([gender, catLinks]) => (
                    <NavigationMenuItem key={gender} className="flex">
                      <NavigationMenuTrigger>{gender}</NavigationMenuTrigger>
                    
                      <div className="flex flex-row">
                        <NavigationMenuContent className="flex flex-col bg-zinc-900 w- p-4">
                          {Object.entries(catLinks).map(
                            ([category, subLinks]) => (
                              <div key={category} className="mt-2">
                                <Link
                                  href={`/${gender.toLowerCase()}/${category.toLowerCase()}`}
                                >
                                  {category}
                                </Link>
                                <ul className="mt-2 flex flex-col">
                                  {subLinks.map((subLink, index) => (
                                    <li key={index}>
                                      <NavigationMenuLink asChild>
                                        <Link
                                          href={`/${gender.toLowerCase()}/${category.toLowerCase()}/${subLink.toLowerCase()}`}
                                        >
                                          {subLink}
                                        </Link>
                                      </NavigationMenuLink>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )
                          )}
                        </NavigationMenuContent>
                      </div>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
 */}
            <Button
              asChild
              variant={"link"}
              className=" text-4xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Link className="text-black" href="/men">
                Men
              </Link>
            </Button>
            <Button
              asChild
              variant={"link"}
              className=" text-4xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Link className="text-black" href="/women">
                Women
              </Link>
            </Button>
            <Button
              asChild
              variant={"link"}
              className=" text-4xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Link className="text-black" href="/unisex">
                Unisex
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
    </div>
  );
}
