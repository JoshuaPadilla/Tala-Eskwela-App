import { DAY_OF_WEEK } from "../enums/day_of_week";

export interface CreateScheduleDto {
  day_of_week: DAY_OF_WEEK;
  start_time: string;
  end_time: string;
  class_id: string;
  subject_id: string;
}
