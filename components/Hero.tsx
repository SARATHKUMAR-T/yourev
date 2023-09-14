import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import {
  ClipboardCheck,
  LayoutDashboard,
  PackagePlus,
  TrendingUp,
  UserCog2,
} from "lucide-react";
import Container from "./Container";

const features = [
  {
    icon: <PackagePlus className="w-8 h-8" />,
    title: "Streaker",
    des: "create a streak you need to follow",
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Tracker",
    des: "Keep Track Of Every Streaks You Created",
  },
  {
    icon: <ClipboardCheck className="w-8 h-8" />,
    title: "Self Eva",
    des: "Evaluate Yourself to see the Progress",
  },
  {
    icon: <LayoutDashboard className="w-8 h-8" />,
    title: "Personal Dashboard",
    des: "Everything in one place.",
  },
  {
    icon: <UserCog2 className="w-8 h-8" />,
    title: "Personalized Profile",
    des: "Take full ownership of your account.",
  },
];

export default function Hero() {
  return (
    <Container>
      <div className="min-h-screen pt-16  grid grid-rows-2 md:grid-rows-1  md:grid-cols-2">
        <div className="space-y-4 px-4 ">
          <p className="text-start pt-6  sm:pt-16 text-7xl font-normal capitalize">
            make yourself,
            <br />
            <span className="text-end">a best version</span>
          </p>
          <div className="w-16 h-1 bg-yellow-400" />
          <p className="text-xl">
            Let experience a new version of you with our help.
            <br />
            Make a streak,follow and conquer it.
          </p>

          <Button
            asChild
            className="capitalize w-1/2 md:w-3/5 h-11 rounded-sm flex justify-around "
          >
            <Link href="/signup">
              Lets start a journey
              <ChevronRightIcon />
            </Link>
          </Button>
          <div className="w-full flex justify-start   h-2/5 relative">
            <Image priority src="/assets/explorer.svg" alt="hero" fill />
          </div>
        </div>
        <div className="w-3/4 mx-auto  rounded-sm shadow-lg h-auto dark:bg-slate-900/40 bg-gray-100 py-4 px-8 mt-16  ">
          <p>FEATURES</p>
          {features.map((item, i) => (
            <div key={i} className="flex mt-14 mx-auto  gap-8 items-center">
              {item.icon}
              <div>
                <h4 className="text-xl font-medium">{item.title}</h4>
                <p>{item.des}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
