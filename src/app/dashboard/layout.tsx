import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import "./../globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DashboardNav from "@/components/dashboardNav";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row w-full h-screen">
      {/* side nav */}
      <DashboardNav />
      {/*  <Card className="h-full p-2">
        <div className="flex flex-col w-full h-full space-y-2">
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
      </Card> */}
      {/* main */}
      <section className="flex flex-col flex-1 w-full h-screen p-4 space-y-4 overflow-scroll">
        {children}
      </section>
    </div>
  );
}
