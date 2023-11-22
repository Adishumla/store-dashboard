import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import hero from "../public/hero.jpg";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-8 my-auto justify-center pb-0 pt-12">
      <section className="flex flex-col md:flex-row items-center gap-8">
        <Image
          src="/hero.jpg"
          alt="hero"
          className="rounded-md"
          width={600}
          height={600}
          quality={100}
        />
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-6xl md:text-[200px] font-bold text-center riviera">
            Con Hielo
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Button
              asChild
              className="text-xl md:text-2xl w-36 md:w-48 font-extralight h-12 md:h-16 bg-zinc-900"
            >
              <Link href="/men">Men</Link>
            </Button>
            <Button
              asChild
              className="text-xl md:text-2xl w-36 md:w-48 font-extralight h-12 md:h-16"
            >
              <Link href="/women">Women</Link>
            </Button>
            <Button
              asChild
              className="text-xl md:text-2xl w-36 md:w-48 font-extralight h-12 md:h-16"
            >
              <Link href="/unisex">Unisex</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
