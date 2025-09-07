import { ImageSourcePropType } from "react-native";
import registration_bg from "../../../assets/images/onboarding/registration_bg.png";
import welcome_bg from "../../../assets/images/onboarding/welcome_bg.png";

interface ImagesProps {
  welcome_bg: ImageSourcePropType;
  registration_bg: ImageSourcePropType;
}

export const Images: ImagesProps = {
  welcome_bg,
  registration_bg,
};
