// page.tsx
import { NextApiHandler } from "next";
import React, { useEffect } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page: NextApiHandler = async (req, res) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Some dashboard content</p>
    </div>
  );
};

export default Page;
