import Categories from "@/app/dashboard/categories/page";
import { products } from "@/lib/drizzleTest";
import { Product } from "@/lib/type";
import NavbarUtility from "./navbarUtility";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { users } from "@/lib/drizzleTest";
import { Category, SubCategory, User } from "@/lib/type";

export default async function Navbar() {
  const cookieStore = cookies();
  const categoriesByGender = (products.docs as unknown as Product[]).reduce(
    (acc, product) => {
      const gender = product.gender;
      const category = product.category.title;
      const subCategory = product.subCategory.title;

      if (!acc[gender]) {
        acc[gender] = {};
      }

      if (!acc[gender][category]) {
        acc[gender][category] = new Set();
      }

      acc[gender][category].add(subCategory);

      return acc;
    },
    {} as Record<string, Record<string, Set<string>>>
  );

  const token = cookieStore.get("payload-token")?.value;

  const authHeaders = {
    Authorization: `JWT ${token}`,
  };

  const response = await fetch(`${process.env.ORIGIN}/api/users/me`, {
    credentials: "include",
    headers: authHeaders,
  });

  const data = await response.json();
  const userRoles = data.user?.roles || ["none"];

  const sortedCategoriesByGender = Object.fromEntries(
    Object.entries(categoriesByGender).map(([gender, categories]) => [
      gender,
      Object.fromEntries(
        Object.entries(categories).map(([category, subCategories]) => [
          category,
          Array.from(subCategories)
            .filter((subCategory) => subCategory)
            .sort((a, b) => a.localeCompare(b)),
        ])
      ),
    ])
  );

  return (
    <NavbarUtility
      categories={sortedCategoriesByGender}
      userRole={userRoles[0]}
    />
  );
}
