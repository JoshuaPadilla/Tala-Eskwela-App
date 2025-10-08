import React from "react";
import { Text } from "react-native";

interface Props {
  additionalClassname?: string;
  value: string;
}

const H1Text = ({ additionalClassname, value }: Props) => {
  return (
    <Text className={`text-sm font-poppins-regular ${additionalClassname}`}>
      {value}
    </Text>
  );
};

export default H1Text;
