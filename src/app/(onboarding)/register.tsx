import { Roles } from "@/src/enums/role.enum";
import { Parent } from "@/src/interfaces/parent.interface";
import { useAuthStore } from "@/src/stores/auth.store";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const parent: Parent = {
  first_name: "Joshua",
  last_name: "Vincent",
  middle_name: "Padilla",
  email: "sample20@email.com",
  password: "12345678",
  phone: "09123456789",
  role: Roles.PARENT,
};

const Register = () => {
  const { register } = useAuthStore();
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white gap-10">
      <TouchableOpacity
        onPress={() => {
          register(Roles.PARENT, parent);
        }}
      >
        <Text>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Register;
