import { DAY_OF_WEEK } from "../enums/day_of_week";
import { Class } from "./class.interface";
import { Subject } from "./subject.interface";

export interface Schedule {
  schedule_id: string;
  day_of_week: DAY_OF_WEEK;
  start_time: string;
  end_time: string;
  class: Class;
  Subject: Subject;
}
