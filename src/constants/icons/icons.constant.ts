import { ImageSourcePropType } from "react-native";
import absent from "../../../assets/icons/absent_icon.png";
import app_logo from "../../../assets/icons/app_logo.png";
import arrow_right from "../../../assets/icons/arrow_right.png";
import back_cyan from "../../../assets/icons/back_cyan.png";
import back from "../../../assets/icons/back_green.png";
import back_white from "../../../assets/icons/back_white.png";
import dot_option from "../../../assets/icons/dot_option.png";
import options from "../../../assets/icons/options_icon.png";
import plus from "../../../assets/icons/plus_icon.png";
import present from "../../../assets/icons/present_icon.png";
import edit from "../../../assets/icons/profile_edit.png";
import profile_placeholder from "../../../assets/icons/profile_placeholder.png";
import profile from "../../../assets/icons/profile_placeholder_icon.png";
import parent from "../../../assets/icons/role_selection/parent.png";
import student from "../../../assets/icons/role_selection/student.png";
import teacher from "../../../assets/icons/role_selection/teacher.png";
import search_bar from "../../../assets/icons/search_bar_icon.png";
import time_in from "../../../assets/icons/time_in.png";
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
  back_cyan: ImageSourcePropType;
  back_white: ImageSourcePropType;
  time_in: ImageSourcePropType;
  present: ImageSourcePropType;
  absent: ImageSourcePropType;
  options: ImageSourcePropType;
  profile_placeholder: ImageSourcePropType;
  search_bar: ImageSourcePropType;
  arrow_right: ImageSourcePropType;
  dot_option: ImageSourcePropType;
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
  back_cyan,
  back_white,
  time_in,
  present,
  absent,
  options,
  profile_placeholder,
  search_bar,
  arrow_right,
  dot_option,
};
