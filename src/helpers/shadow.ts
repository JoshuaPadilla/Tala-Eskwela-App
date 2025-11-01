import { Platform } from "react-native";

export const shadow = () => {
  const platform = Platform.OS;

  return platform === "ios"
    ? {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      }
    : { elevation: 2   };
};
