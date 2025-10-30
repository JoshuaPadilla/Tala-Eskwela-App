import { Schedule } from "@/src/interfaces/schedule.interface";
import React from "react";
import { ScrollView } from "react-native";
import StudentScheduleCard from "./student_schedule_cards";

interface Props {
  schedules: Schedule[] | [];
}

const StudentScheduleList = ({ schedules }: Props) => {
  return (
    <ScrollView
      contentContainerClassName="pb-[100px] flex-row flex-wrap gap-2"
      showsVerticalScrollIndicator={false}
    >
      {schedules.map((sched, idx) => (
        <StudentScheduleCard sched={sched} key={idx} />
      ))}
    </ScrollView>
  );
};

export default StudentScheduleList;
