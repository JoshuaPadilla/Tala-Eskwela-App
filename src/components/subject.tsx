import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Subject } from "../interfaces/subject.interface";

interface SubjectProps {
  subject?: Subject;
}

const SubjectComponent = ({ subject }: SubjectProps) => {
  return (
    <TouchableOpacity className="w-full py-4 px-2 bg-purple-200 rounded-md">
      <Text>{subject?.name}</Text>
    </TouchableOpacity>
  );
};

export default SubjectComponent;
