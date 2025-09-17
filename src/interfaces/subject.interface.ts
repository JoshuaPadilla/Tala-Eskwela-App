import { Schedule } from "./schedule.interface";

export interface Subject {
  id?: string;
  name: string;
  desc?: string;
  schedules?: Schedule[];
}
