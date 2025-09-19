import { ImageSourcePropType } from "react-native";
import alvin from "../../../assets/images/alvin.jpg";
import dino from "../../../assets/images/dino.jpg";
import jenjen from "../../../assets/images/jenjen.jpg";
import registration_bg from "../../../assets/images/onboarding/registration_bg.png";
import welcome_bg from "../../../assets/images/onboarding/welcome_bg.png";
import revel from "../../../assets/images/revel.jpg";
import rovel from "../../../assets/images/rovel.jpg";

interface ImagesProps {
  welcome_bg: ImageSourcePropType;
  registration_bg: ImageSourcePropType;
  alvin: ImageSourcePropType;
  rovel: ImageSourcePropType;
  jenjen: ImageSourcePropType;
  dino: ImageSourcePropType;
  revel: ImageSourcePropType;
}

export const Images: ImagesProps = {
  welcome_bg,
  registration_bg,
  alvin,
  rovel,
  jenjen,
  dino,
  revel,
};
