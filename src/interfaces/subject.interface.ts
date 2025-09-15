import { Schedule } from "./schedule.interface";

export interface Subject {
  subject_id?: string;
  name: string;
  desc?: string;
  schedules: Schedule[];
}
