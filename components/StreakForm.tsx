"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const formSchema = z.object({
  streakname: z.string(),
  maxdays: z.string(),
  description: z.string(),
});

export default function StreakForm({
  setIsFormOpen,
  isFormOpen,
}: {
  setIsFormOpen: any;
  isFormOpen: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const router = useRouter();
  const { toast } = useToast();
  const token = localStorage.getItem("token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["x-auth-token"] = token;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      streakname: "",
      maxdays: "",
      description: "",
    },
  });

  // const { mutate, isLoading } = useMutation(
  //   data =>
  //     axios.post("https://zemo-backend.vercel.app/api/addstreak", data, {
  //       headers: {
  //         "x-auth-token": token,
  //       },
  //     }),
  //   {
  //     onSuccess: data => {
  //       toast({
  //         title: data.data.message,
  //       });
  //       queryClient.invalidateQueries({ queryKey: ["streaks"] });
  //       setIsFormOpen(false);
  //     },
  //     onError: error => {
  //       toast({ title: "Error" });
  //     },
  //   }
  // );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const daysCount = parseInt(values.maxdays);
    const data = {
      ...values,
      maxdays: daysCount,
    };

    const res = await fetch(`https://zemo-backend.vercel.app/api/addstreak`, {
      method: "POST",
      body: JSON.stringify(data),
      headers,
    });
    const result = await res.json();
    if (result.message === "New Streak Created Successfully!") {
      setIsLoading(false);
      toast({
        title: result.message,
        description: "Here You Go🚀",
        duration: 5000,
      });
      queryClient.invalidateQueries({ queryKey: ["streaks"] });
      setIsFormOpen(false);
    } else {
      setIsLoading(false);
      toast({
        title: result.message,
        description: "Try Again🚀",
        duration: 3000,
      });
    }
  }
  return (
    <div className="max-w-lg bg-slate-100 dark:bg-slate-900 rounded-md px-8 pb-12 pt-8 w-2/4 relative">
      <X
        className="absolute right-4 top-4 z-20 cursor-pointer"
        onClick={() => {
          setIsFormOpen(!isFormOpen);
        }}
      />
      <h4 className="text-3xl text-center mb-5 font-medium">Streaker</h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="streakname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Streak Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxdays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Days</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Streak Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    {...field}
                    placeholder="Be Specific About Your Streak"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full  " disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                <span>Creating...</span>
              </>
            ) : (
              <span>Create</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
