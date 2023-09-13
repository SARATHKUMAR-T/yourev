"use client";
import {
  formatDistanceToNow,
  parse,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarYears,
} from "date-fns";

export function calculateTimeDifference(beginningDateString) {
  const beginningDate = parse(
    beginningDateString,
    "MM/dd/yyyy, h:mm:ss aa",
    new Date()
  );
  const currentTime = new Date();

  const duration = formatDistanceToNow(beginningDate, { addSuffix: true });
  const days = differenceInCalendarDays(currentTime, beginningDate);
  const months = differenceInCalendarMonths(currentTime, beginningDate);
  const years = differenceInCalendarYears(currentTime, beginningDate);

  return {
    duration,
    days,
    months,
    years,
  };
}
