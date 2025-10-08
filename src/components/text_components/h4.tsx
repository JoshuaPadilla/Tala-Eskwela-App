import React from "react";
import { Text } from "react-native";

interface Props {
  additionalClassname?: string;
  value: string;
}

const H4Text = ({ additionalClassname, value }: Props) => {
  return (
    <Text className={`text-3xl font-poppins-extrabold ${additionalClassname}`}>
      {value}
    </Text>
  );
};

export default H4Text;
