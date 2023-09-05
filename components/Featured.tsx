import React from "react";
import { Button } from "./ui/button";
import { Quote } from "lucide-react";
import Image from "next/image";

export default function Featured() {
  return (
    <section className="mt-16 bg-yellow-400 h-[70vh]  flex items-center justify-center">
      <div className="flex flex-col sm:flex-row max-w-6xl w-full mx-auto py-12 ">
        <div className="flex-1 dark:text-black border-r-2 border-dashed space-y-1 border-gray-600 px-4">
          <p>All in one</p>
          <p className="text-6xl font-medium">ZEMO</p>
          <p className="capitalize text-xl ">
            Everything you need for self-development
          </p>
          <p className="pt-3 leading-7">
            With Zemo You can elevate your life to next level.
            <br />
            It comes with sophisticated features to keep your goal on top.
            <br />
            Join with rare community that focus on self development.
          </p>
          <div className="pt-6">
            <Button className="w-28" variant="destructive">
              TRY ZEMO
            </Button>
          </div>
        </div>
        <div className="flex-1  px-8 ml-4 ">
          <div className="h-12 w-12 rounded-full bg-slate-900 p-3">
            <Quote className="text-white" />
          </div>
          <p className="capitalize mt-6 max-w-sm mx-auto">
            Is Self development is your main focus
            <br />
            then ZEMO is the thing you only need.
          </p>
          <div className="mt-4 flex ">
            <Image
              src="/public/zenmo.jpg"
              height={24}
              width={24}
              alt="zenmo"
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
