import { Student } from "@/src/interfaces/student.interface";
import React from "react";
import { ScrollView, Text } from "react-native";

interface StudentListProps {
  students: Student[];
}

const StudentList = ({ students }: StudentListProps) => {
  return (
    <ScrollView>
      {students.map((student, idx) => (
        <Text key={student.id || idx}>{student.first_name}</Text>
      ))}
    </ScrollView>
  );
};

export default StudentList;
