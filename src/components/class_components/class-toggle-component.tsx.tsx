import React from "react";
import { View } from "react-native";
import { ClassToggle } from "../../enums/view_class_toggle.enum";
import ToggleItemComponent from "../toggle-item.component";

interface ClassToggleComponentProps {
  selectedItem: ClassToggle;
  data: string[];
  onSelectCallback: (selectedState: ClassToggle) => void;
}

const ClassToggleComponent = ({
  data,
  onSelectCallback,
  selectedItem,
}: ClassToggleComponentProps) => {
  return (
    <View className="rounded-md flex-row w-full justify-between">
      {data.map((item, idx) => (
        <ToggleItemComponent
          selectedItem={selectedItem}
          item={item as ClassToggle}
          key={idx}
          onSelect={onSelectCallback}
        />
      ))}
    </View>
  );
};

export default ClassToggleComponent;
