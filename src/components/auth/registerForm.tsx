"use client";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export function RegisterForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (response.ok) {
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
        duration: 5000,
      });
    } else {
      toast({
        title: "Registration failed",
        variant: "destructive",
        description: data.message,
        duration: 5000,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="email"
          control={form.control}
          render={({ fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="Email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  {...form.register("password")}
                  placeholder="Password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Register</Button>
      </form>
    </Form>
  );
}

export default RegisterForm;
