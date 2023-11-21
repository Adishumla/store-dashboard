import Categories from "@/app/dashboard/categories/page";
import { products } from "@/lib/drizzleTest";
import { Product } from "@/lib/type";
import NavbarUtility from "./navbarUtility";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { users } from "@/lib/drizzleTest";

export default async function Navbar(req: NextRequest) {
  const categoriesByGender = products.docs.reduce((acc, product) => {
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
  }, {} as Record<string, Record<string, Set<string>>>);

  let userRoles = users.docs.map((user) => user.roles[0]);
  console.log(userRoles);

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
