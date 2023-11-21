"use client";
import { Button } from "./ui/button";
import { useState } from "react";
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

  console.log(userRole);
  let isAdmin = userRole === "admin";
  console.log(isAdmin);

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
          } flex-col justify-center items-center gap-2 h-screen w-screen bg-zinc-900 p-4 shadow-md`}
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
          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } flex-col justify-center items-center z-10`}
          >
            <NavigationMenu>
              <NavigationMenuList>
                {Object.entries(categories).map(([gender, catLinks]) => (
                  <NavigationMenuItem key={gender}>
                    <NavigationMenuTrigger>{gender}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      {Object.entries(catLinks).map(([category, subLinks]) => (
                        <div key={category} className="p-4">
                          <Link
                            href={`/${gender.toLowerCase()}/${category.toLowerCase()}`}
                          >
                            {category}
                          </Link>
                          <ul className="mt-2 flex flex-col">
                            {subLinks.map((subLink, index) => (
                              <li key={index} className="mt-1">
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
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

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
