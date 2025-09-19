import { ImageSourcePropType } from "react-native";
import app_logo from "../../../assets/icons/app_logo.png";
import back from "../../../assets/icons/back_green.png";
import plus from "../../../assets/icons/plus_icon.png";
import edit from "../../../assets/icons/profile_edit.png";
import profile from "../../../assets/icons/profile_placeholder_icon.png";
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
  back: ImageSourcePropType;
  plus: ImageSourcePropType;
  profile: ImageSourcePropType;
  edit: ImageSourcePropType;
}

export const Icons: IconsState = {
  app_logo,
  parent,
  teacher,
  student,
  trash,
  back,
  plus,
  profile,
  edit,
};
