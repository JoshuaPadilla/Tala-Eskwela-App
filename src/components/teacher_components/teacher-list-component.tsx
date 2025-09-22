import { Teacher } from "@/src/interfaces/teacher.interface";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface TeacherComponentProps {
  teacher: Teacher;
  onSelect: (teacher: Teacher) => void;
}
const TeacherListComponent = ({ teacher, onSelect }: TeacherComponentProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleSelect = () => {
    onSelect(teacher);
  };

  return (
    <TouchableOpacity
      className="p-4 rounded-md"
      style={[isPressed ? styles.pressed : styles.notPressed]}
      onPress={handleSelect}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <Text>
        {teacher.first_name} {teacher.last_name}
      </Text>
      <Text>
        {teacher.advisory_class?.grade_lvl} {teacher.advisory_class?.section}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pressed: {
    backgroundColor: "#0891b2",
  },
  notPressed: {
    backgroundColor: "#a5f3fc",
  },
});

export default TeacherListComponent;
