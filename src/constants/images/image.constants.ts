import { ImageSourcePropType } from "react-native";
import welcome_bg from "../../../assets/images/onboarding/welcome_bg.png";

interface ImagesProps {
  welcome_bg: ImageSourcePropType;
}

export const Images: ImagesProps = {
  welcome_bg: welcome_bg,
};
