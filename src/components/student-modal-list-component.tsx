import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Student } from "../interfaces/student.interface";

interface StudentModalItemProps {
  student: Student;
  onSelect: (student_id: string) => void;
  onUnSelect: (student_id: string) => void;
}

const StudentModalListComponent = ({
  student,
  onSelect,
  onUnSelect,
}: StudentModalItemProps) => {
  const [selected, setSelected] = useState(false);

  const handleOnSelect = () => {
    setSelected(!selected);

    if (selected) {
      onUnSelect(student.id);
    } else {
      onSelect(student.id);
    }
  };

  return (
    <TouchableOpacity
      className="w-full p-4 bg-purple-200 rounded-md"
      onPress={handleOnSelect}
    >
      <View className="flex-row justify-between">
        <Text>
          {student.first_name} {student.middle_name} {student.last_name}
        </Text>

        <View
          className={`size-4 border border-cyan-400 ${selected ? "bg-cyan-400" : ""}`}
        ></View>
      </View>
    </TouchableOpacity>
  );
};

export default StudentModalListComponent;
