"use client";
import Header from "@/components/Header";
import StreakForm from "@/components/StreakForm";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { PlusCircleIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getStreaks } from "@/lib/services/streaks";
import axios from "axios";
import StreakCard from "@/components/StreakCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Streaker() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["streaks"],
    queryFn: getStreaks,
  });
  const streaks = data?.data?.streaks;

  return (
    <section className="bg-white">
      <Header />
      {isFormOpen ? (
        <div className="w-full h-full bg-slate-50 min-h-screen backdrop-blur-md flex items-center justify-center ">
          <StreakForm setIsFormOpen={setIsFormOpen} isFormOpen={isFormOpen} />
        </div>
      ) : (
        <div className="pt-16 min-h-screen w-full ">
          {isLoading && (
            <>
              <Skeleton className="flex justify-end px-12 py-8" />
              <Skeleton className="max-w-2xl px-6  pb-6 flex flex-col gap-6 w-full  mx-auto" />
            </>
          )}
          <div className="flex justify-end px-12 py-8">
            <Button
              variant="default"
              onClick={() => setIsFormOpen(!isFormOpen)}
            >
              <>
                <PlusCircleIcon className="mr-2" />
                Create a Streak
              </>
            </Button>
          </div>
          <div className="max-w-2xl px-6  pb-6 flex flex-col gap-6 w-full  mx-auto">
            {streaks ? (
              streaks.map(streak => (
                <StreakCard key={streak._id} streak={streak} />
              ))
            ) : (
              <p>Please add some streaks</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
