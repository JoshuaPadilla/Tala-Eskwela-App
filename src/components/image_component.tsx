import { Image, ImageSource } from "expo-image";
import React from "react";
import { ImageSourcePropType } from "react-native";
import { Icons } from "../constants/icons/icons.constant";

interface Props {
  source: ImageSource | ImageSourcePropType | null | string;
  size?: number;
  w?: number;
  h?: number;
  radius?: number;
}

const ImageComponent = ({ source, size, w, h, radius }: Props) => {
  const imgSz = size ? { width: size, height: size } : { width: w, height: h };

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <Image
      source={source || Icons.profile_placeholder}
      style={{ ...imgSz, borderRadius: radius }}
      placeholder={blurhash}
    />
  );
};

export default ImageComponent;
