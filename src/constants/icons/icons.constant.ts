import { ImageSourcePropType } from "react-native";
import app_logo from "../../../assets/icons/app_logo.png";
import parent from "../../../assets/icons/role_selection/parent.png";
import student from "../../../assets/icons/role_selection/student.png";
import teacher from "../../../assets/icons/role_selection/teacher.png";
import trash from "../../../assets/icons/trash.png";

interface IconsState {
  app_logo: ImageSourcePropType;
  parent: ImageSourcePropType;
  teacher: ImageSourcePropType;
  student: ImageSourcePropType;
  trash: ImageSourcePropType;
}

export const Icons: IconsState = {
  app_logo,
  parent,
  teacher,
  student,
  trash,
};
