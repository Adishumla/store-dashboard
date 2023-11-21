import Link from "next/link";
import { Button } from "@/components/ui/button";
import GetUserEmail from "@/components/auth/getUser";
import Navbar from "@/components/navbarUtility";
import Image from "next/image";
import hero from "../public/hero.jpg";

export default async function Home() {
  /* hero.jpg is in pulbic */
  return (
    <main className="flex min-h-screen flex-col items-center p-8 my-auto justify-center">
      {/*  <GetUserEmail />
      <div className="flex flex-row items-center gap-2">
        <Button asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <Button asChild>
          <Link href="/test">Test</Link>
        </Button>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/register">Register</Link>
        </Button>
        <Button asChild>
          <Link href="/admin">Admin</Link>
        </Button>
        <Button asChild>
          <Link href="/admin/logout">Logout</Link>
        </Button>
      </div> */}
      <section className="flex flex-row items-center gap-8">
        <Image
          src="/hero.jpg"
          alt="hero"
          /* liquid morph */
          className="rounded-md"
          width={600}
          height={600}
          quality={100}
        />
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-[200px] font-bold text-center riviera">
            Con Hielo
          </h1>
          <div className="flex flex-row items-center gap-4">
            <Button
              asChild
              className="text-2xl w-48 font-extralight h-16 bg-zinc-900"
            >
              <Link href="/men">Men</Link>
            </Button>
            <Button asChild className="text-2xl w-48 font-extralight h-16">
              <Link href="/women">Women</Link>
            </Button>
            <Button asChild className="text-2xl w-48 font-extralight h-16">
              <Link href="/unisex">Unisex</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
