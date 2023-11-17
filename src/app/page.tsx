import Link from "next/link";
import { Button } from "@/components/ui/button";
import GetUserEmail from "@/components/auth/getUser";
import Navbar from "@/components/navbar";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <GetUserEmail />
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
      </div>
    </main>
  );
}
