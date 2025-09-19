import { DAY_OF_WEEK } from "../enums/day_of_week";
import { Class } from "./class.interface";
import { Subject } from "./subject.interface";

export interface Schedule {
  id: string;
  day_of_week: DAY_OF_WEEK;
  start_time: string;
  end_time: string;
  class: Class;
  subject: Subject;
}
