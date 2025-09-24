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
