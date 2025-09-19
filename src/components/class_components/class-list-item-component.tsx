import { Class } from "@/src/interfaces/class.interface";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ClassListItemComponentProps {
  classObj: Class;
  onSelect: (classObj: Class) => void;
}
const ClassListItemComponent = ({
  classObj,
  onSelect,
}: ClassListItemComponentProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleSelect = () => {
    onSelect(classObj);
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
        {classObj.section} {classObj.grade_lvl}
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

export default ClassListItemComponent;
