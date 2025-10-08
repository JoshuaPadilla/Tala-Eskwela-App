import React from "react";
import { Text } from "react-native";

interface Props {
  additionalClassname?: string;
  value: string;
}

const H2Text = ({ additionalClassname, value }: Props) => {
  return (
    <Text className={`text-lg font-poppins-medium ${additionalClassname}`}>
      {value}
    </Text>
  );
};

export default H2Text;
