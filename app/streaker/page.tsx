"use client";
import Header from "@/components/Header";
import StreakForm from "@/components/StreakForm";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle, PlusCircleIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getStreaks } from "@/lib/services/streaks";
import StreakCard from "@/components/StreakCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

interface Streak {
  _id: string;
  streakname: string;
  description: string;
  maxdays: number;
  isstarted: boolean;
  startdate: string;
}

export default function Streaker() {
  const router = useRouter();
  useEffect(() => {
    function token() {
      if (!localStorage.getItem("token")) {
        router.push("/");
      }
    }
    token();
  }, [router]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["streaks"],
    queryFn: getStreaks,
  });
  const streaks: Streak[] | undefined = data?.data?.streaks;

  return (
    <section className="bg-white">
      <Header />
      {isFormOpen ? (
        <div className="w-full h-full bg-slate-50 min-h-screen backdrop-blur-md flex items-center justify-center">
          <StreakForm setIsFormOpen={setIsFormOpen} isFormOpen={isFormOpen} />
        </div>
      ) : (
        <div className="pt-16 min-h-screen w-full">
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
          <div className="max-w-2xl px-6 pb-6 flex flex-col gap-6 w-full mx-auto">
            {isLoading && (
              <Skeleton className="max-w-2xl mx-auto px-6 pb-6 w-full h-40 bg-gray-200">
                <Skeleton className="h-12 w-12 rounded-full" />
              </Skeleton>
            )}
            {streaks &&
              streaks.map(streak => (
                <StreakCard key={streak._id} streak={streak} />
              ))}
            {streaks?.length === 0 ||
              (!streaks && (
                <div>
                  <p>
                    <PlusCircle />
                    <span>Please Add Some Streaks To Continue</span>
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
}
