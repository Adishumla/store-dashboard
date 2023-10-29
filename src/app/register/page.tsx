import React from "react";
import RegisterForm from "@/components/auth/registerForm";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen space-y-8">
      <section className="w-1/2 outline p-12 outline-zinc-800 rounded-xl">
        <h1 className="text-4xl font-bold text-slate-100">Register</h1>
        <RegisterForm />
      </section>
    </div>
  );
}
