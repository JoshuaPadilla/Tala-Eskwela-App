import { Image } from "expo-image";
import { Text, View } from "react-native";

export const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon?: any;
  title: string;
  indicatorNumber?: number;
}) => {
  const iconSize = focused ? 20 : 18;

  return (
    <View className="flex-1 mt-3 flex flex-col items-center ">
      {icon && (
        <Image
          source={icon}
          tintColor={focused ? "#22d3ee" : "#666876"}
          style={{ width: iconSize, height: iconSize }}
          contentFit="contain"
        />
      )}
      <Text
        className={`${
          focused
            ? "text-cyan-400 font-poppins-medium"
            : "text-black-200 font-poppins-regular"
        } text-xs w-full text-center mt-1`}
      >
        {title}
      </Text>
    </View>
  );
};
