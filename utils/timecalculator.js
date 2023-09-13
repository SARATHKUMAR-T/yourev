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
    "dd/MM/yyyy, h:mm:ss aa",
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

// Example usage:
const beginningDateString = "9/12/2023, 4:32:23 pm";
const timeDifference = calculateTimeDifference(beginningDateString);
console.log(timeDifference);
