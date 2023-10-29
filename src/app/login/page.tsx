import React from "react";
import LoginForm from "@/components/auth/loginForm";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen space-y-8">
      <section className="w-1/2 outline p-12 outline-zinc-800 rounded-xl">
        <h1 className="text-4xl font-bold text-slate-100">Login</h1>
        <LoginForm />
      </section>
    </div>
  );
}
