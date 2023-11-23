"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const DashboardNav = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => setIsNavVisible(!isNavVisible);

  return (
    <>
      {/* Mobile Nav Toggle */}
      <div className="md:hidden absolute top-0 left-0 z-20 p-4 pl-6">
        <Button variant={"outline"} onClick={toggleNav}>
          Menu
        </Button>
      </div>

      {/* Side Nav */}
      <Card
        className={`h-full p-2 ${
          isNavVisible ? "block" : "hidden"
        } md:block absolute z-10 md:relative `}
      >
        <div className="flex flex-col w-full h-full space-y-2 pt-20">
          <Button variant={"ghost"} size={"default"}>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button variant={"ghost"} size={"default"}>
            <Link href="/dashboard/categories">Categories</Link>
          </Button>
          <Button variant={"ghost"} size={"default"}>
            <Link href="/dashboard/products">Products</Link>
          </Button>
        </div>
      </Card>
    </>
  );
};

export default DashboardNav;
