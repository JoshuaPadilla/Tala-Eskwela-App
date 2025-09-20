import { Subject } from "@/src/interfaces/subject.interface";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface SubjectListItemProps {
  subject: Subject;
  onSelect: (subject: Subject) => void;
}
const SubjectListItemComponent = ({
  subject,
  onSelect,
}: SubjectListItemProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleSelect = () => {
    onSelect(subject);
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
        {subject.name} {subject.desc}
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

export default SubjectListItemComponent;
