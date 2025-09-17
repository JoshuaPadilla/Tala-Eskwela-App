import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Teacher } from "../interfaces/teacher.interface";

interface TeacherComponentProps {
  teacher: Teacher;
  onSelect: (teacher: Teacher) => void;
}
const TeacherComponent = ({ teacher, onSelect }: TeacherComponentProps) => {
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

export default TeacherComponent;
