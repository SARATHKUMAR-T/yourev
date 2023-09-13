"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeftCircle, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export default function Signin() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isLoading } = useMutation(
    async values => {
      const response = await axios.post(
        "https://zemo-backend.vercel.app/api/signin",
        values
      );
      return response.data;
    },
    {
      onSuccess: (data: any) => {
        toast({
          title: "User Signed In Successfully!",
        });
        const token = (data as { token: string }).token;
        localStorage.setItem("token", token);
        form.reset();
        router.push("/dashboard");
      },
      onError: (error: unknown) => {
        if (error instanceof AxiosError && error.response?.status === 500) {
          toast({
            title: "User Not Found!",
            description: "Please Create An Account And Continue",
          });
        } else if (
          error instanceof AxiosError &&
          error.response?.status === 400
        ) {
          toast({
            title: "Invalid Credentials!",
            variant: "destructive",
            description: "Try Again with Correct Credentials",
          });
        } else {
          toast({
            title: "Unknown Error!",
            description: "Please Try Again Later",
            variant: "destructive",
          });
        }
      },
    }
  );
  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }
  return (
    <section className="min-h-screen flex flex-col w-full items-center justify-center p-4 px-8">
      <Button className="flex gap-x-2 mb-8" asChild variant="secondary">
        <Link href="/">
          <ChevronLeftCircle />
          <p>Back To Home Page</p>
        </Link>
      </Button>
      <div className="max-w-lg px-6 py-12 mx-auto w-full dark:bg-slate-900 bg-slate-100 rounded-lg ">
        <h3 className="text-3xl mb-8 text-center">Signin</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jhon@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="...." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full  " disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </Button>
          </form>
        </Form>
        <Button className="mt-4 " variant="link">
          <Link href="/signup" className="underline">
            Don&apos;t Have An Account?
          </Link>
        </Button>
      </div>
    </section>
  );
}
