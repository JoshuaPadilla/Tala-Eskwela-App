import { Icons } from "@/src/constants/icons/icons.constant";
import { Teacher } from "@/src/interfaces/teacher.interface";
import { useTeacherStore } from "@/src/stores/teacher.store";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface TeacherComponentProps {
  teacher: Teacher;
  onSelect: (teacher: Teacher) => void;
}
const TeacherListComponent = ({ teacher, onSelect }: TeacherComponentProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const { deleteTeacher } = useTeacherStore();

  const handleSelect = () => {
    onSelect(teacher);
  };

  const handleDeleteTeacher = async () => {
    await deleteTeacher(teacher.id);
  };

  if (!teacher) return;
  return (
    <TouchableOpacity
      className="p-4 rounded-md"
      style={[isPressed ? styles.pressed : styles.notPressed]}
      onPress={handleSelect}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <View className="flex-row justify-between">
        <Text>
          {teacher.first_name} {teacher.middle_name} {teacher.last_name}
        </Text>
        <Pressable hitSlop={5} onPress={handleDeleteTeacher}>
          <Image
            source={Icons.trash}
            style={{ height: 15, width: 15, tintColor: "#F75555" }}
          />
        </Pressable>
      </View>
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
