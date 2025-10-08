import { Image, ImageSource } from "expo-image";
import React from "react";
import { ImageSourcePropType } from "react-native";

interface Props {
  source: ImageSource | ImageSourcePropType;
  size?: number;
  w?: number;
  h?: number;
  radius?: number;
}

const ImageComponent = ({ source, size, w, h, radius }: Props) => {
  const imgSz = size ? { width: size, height: size } : { width: w, height: h };

  return <Image source={source} style={{ ...imgSz, borderRadius: radius }} />;
};

export default ImageComponent;
