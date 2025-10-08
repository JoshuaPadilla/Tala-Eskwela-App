import React from "react";
import { Text } from "react-native";

interface Props {
  additionalClassname?: string;
  value: string;
}

const H3Text = ({ additionalClassname, value }: Props) => {
  return (
    <Text className={`text-xl font-poppins-bold ${additionalClassname}`}>
      {value}
    </Text>
  );
};

export default H3Text;
