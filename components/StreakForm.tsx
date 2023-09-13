"use client";

import {
  Form,
  FormControl,
  FormDescription,
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
  const queryClient = useQueryClient();

  const router = useRouter();
  const { toast } = useToast();
  const token = localStorage.getItem("token");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {},
  });

  const { mutate, isLoading } = useMutation(
    data =>
      axios.post("http://localhost:9000/api/addstreak", data, {
        headers: {
          "x-auth-token": token,
        },
      }),
    {
      onSuccess: data => {
        toast({
          title: data.data.message,
        });
        queryClient.invalidateQueries({ queryKey: ["streaks"] });
        setIsFormOpen(false);
      },
      onError: error => {
        toast({ title: "Error" });
      },
    }
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const daysCount = parseInt(values.maxdays);
    const data = {
      ...values,
      maxdays: daysCount,
    };
    mutate(data);
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
