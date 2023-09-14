"use client";
import Header from "@/components/Header";
import DashboardCard from "@/components/dashboardcard";
import { Skeleton } from "@/components/ui/skeleton";
import { getStreaks } from "@/lib/services/streaks";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, PenSquare, Swords } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  useEffect(
    function token() {
      if (!localStorage.getItem("token")) {
        router.push("/");
      }
    },
    [router]
  );

  const { data, isLoading } = useQuery({
    queryKey: ["streaks"],
    queryFn: getStreaks,
  });
  const streaks = data?.data?.streaks;

  const startedStreaks = streaks?.filter(
    (streak: any) => streak.isstarted === true
  );
  const completedStreaks = streaks?.filter(
    (streak: any) => streak.iscompleted === true
  );

  const cards = [
    {
      title: "No Of Streaks Created",
      icon: <PenSquare className="h-8 w-8 " />,
      count: streaks?.length,
      style: {
        outer: "bg-yellow-200",
        icon: "bg-yellow-300",
        box: "bg-yellow-500",
      },
    },
    {
      title: "On Going Streaks",
      icon: <Swords className="h-8 w-8 " />,
      count: startedStreaks?.length,
      style: {
        outer: "bg-blue-200",
        icon: "bg-blue-300",
        box: "bg-blue-500",
      },
    },
    {
      title: "No Of Streaks Completed",
      icon: <CheckCircle2 className="h-8 w-8 " />,
      count: completedStreaks?.length,
      style: {
        outer: "bg-green-200",
        icon: "bg-green-300",
        box: "bg-green-600",
      },
    },
  ];

  return (
    <section className="bg-white">
      <Header />
      {isLoading ? (
        <>
          <Skeleton className="max-w-3xl bg-gray-300  mx-auto  px-8 min-h-[50vh] py-16" />
        </>
      ) : (
        <div className="max-w-3xl flex flex-col mx-auto  px-8 min-h-screen py-16">
          {cards.map(card => (
            <DashboardCard key={card.title} card={card} />
          ))}
        </div>
      )}
    </section>
  );
}
