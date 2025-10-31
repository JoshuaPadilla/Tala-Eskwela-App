import dayjs from "dayjs";

export const isBetween = (startTime?: string, endTime?: string): boolean => {
  if (!startTime || !endTime) return false;

  const today = dayjs().format("YYYY-MM-DD");

  const startTimeToMilli = dayjs(`${today} ${startTime}`).valueOf();
  const endTimeToMilli = dayjs(`${today} ${endTime}`).valueOf();

  const currentTime = dayjs().valueOf();

  if (startTimeToMilli <= currentTime && endTimeToMilli >= currentTime) {
    return true;
  }

  return false;
};

export const getSchedTimeStatus = (
  startTime?: string,
  endTime?: string
): "upcoming" | "ongoing" | "ended" | undefined => {
  if (!startTime || !endTime) return "upcoming";

  const today = dayjs().format("YYYY-MM-DD");

  const startTimeToMilli = dayjs(`${today} ${startTime}`).valueOf();
  const endTimeToMilli = dayjs(`${today} ${endTime}`).valueOf();

  const currentTime = dayjs().valueOf();

  if (startTimeToMilli <= currentTime && endTimeToMilli >= currentTime) {
    return "ongoing";
  } else if (startTimeToMilli > currentTime) {
    return "upcoming";
  } else if (endTimeToMilli < currentTime) {
    return "ended";
  }
};
