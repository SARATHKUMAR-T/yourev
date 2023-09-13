"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { calculateTimeDifference } from "@/utils/timecalculator";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function StreakCard({ streak }: { streak: any }) {
  const queryClient = useQueryClient();
  const [durationcal, setDurationcal] = useState({});
  const { toast } = useToast();
  useEffect(() => {
    async function duration(streak: any) {
      if (streak.isstarted) {
        const duro = calculateTimeDifference(streak.startdate);
        setDurationcal(duro);
      }
    }
    duration(streak);
  }, [streak]);

  // streak start function
  const { isLoading, mutate } = useMutation(
    id =>
      axios.patch(
        `https://zemo-backend.vercel.app/api/streaks/start/${id}`,
        { startdate: new Date().toLocaleString() },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
        toast({
          title: "Streak Started Successfully",
          description: "Here You Go🚀 ",
          duration: 5000,
        });
      },
      onError: error => {
        toast({
          title: "Unable to Start the Streak",
          variant: "destructive",
        });
      },
    }
  );

  // delete functionality
  const handleDelete = async (id: string) => {
    const response = await fetch(
      `https://zemo-backend.vercel.app/api/streak/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "content-Type": "appliication/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    if (response.ok && response.status === 200) {
      toast({
        title: "Deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["streaks"] });
    } else {
      toast({
        title: "Deletion failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Card className="bg-slate-100">
        <CardHeader>
          <CardTitle>{streak.streakname}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <CardDescription>
            <>
              <span className="capitalize mb-2">{streak.description}</span>
              <br />
              <span className="text-lg font-medium">{`Target:${streak.maxdays}Days`}</span>
            </>
          </CardDescription>
          <div>
            {!streak.isstarted && (
              <Button
                disabled={isLoading}
                className="mr-4"
                onClick={() => mutate(streak._id)}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    <span>starting</span>
                  </>
                ) : (
                  <span>Start</span>
                )}
              </Button>
            )}
            <AlertDialog>
              <AlertDialogTrigger>Delete</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the streak.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(streak._id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
        <CardFooter>
          {streak.isstarted && durationcal.days < 10 && (
            <p className="text-sm font-semibold">
              {`Started: ${durationcal.duration}`}{" "}
            </p>
          )}
          {streak.isstarted && durationcal.days > 1 && (
            <p>
              Days Completed: <span>${streak.maxdays - durationcal.days}</span>
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
