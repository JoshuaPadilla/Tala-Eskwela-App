import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Icons } from "../constants/icons/icons.constant";
import { RegistrationFormInterface } from "../interfaces/registration-form.interface";

interface RegistrationFormProps {
  formData: RegistrationFormInterface;
  setFormData: (
    updater: (prev: RegistrationFormInterface) => RegistrationFormInterface
  ) => void;
  loading: boolean;
  onSubmit: () => void;
}

const RegistrationForm = ({
  formData,
  setFormData,
  loading,
  onSubmit,
}: RegistrationFormProps) => {
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: RegistrationFormInterface) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <KeyboardAvoidingView
      className="size-full justify-start"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={5}
    >
      <BlurView
        className="size-full border border-cyan-300/30 rounded-xl p-4 overflow-hidden"
        intensity={80}
        tint="systemChromeMaterialDark"
      >
        <Image
          source={Icons.app_logo}
          style={{ height: 120, width: 120, alignSelf: "center" }}
        />
        <Text className="text-primary-400 font-bold text-2xl mb-4 self-center">
          Create your Account
        </Text>

        <ScrollView contentContainerClassName="pb-[100px] gap-6 w-full">
          {/* first name */}
          <View className="w-full items-start justify-center gap-2">
            <Text className="text-primary-400 text-l">First Name</Text>

            <View className="w-full items-start justify-center border border-cyan-200 rounded-lg px-4">
              <TextInput
                className="w-full text-primary-400"
                value={formData.first_name}
                onChangeText={(text) => {
                  handleInputChange("first_name", text);
                }}
              />
            </View>
          </View>

          {/* middle name */}
          <View className="w-full items-start justify-center gap-2">
            <Text className="text-primary-400 text-l">Middle Name</Text>

            <View className="w-full items-start justify-center border border-cyan-200 rounded-lg px-4">
              <TextInput
                className="w-full text-primary-400"
                value={formData.middle_name}
                onChangeText={(text) => {
                  handleInputChange("middle_name", text);
                }}
              />
            </View>
          </View>

          {/* last name */}
          <View className="w-full items-start justify-center gap-2">
            <Text className="text-primary-400 text-l">Last Name</Text>

            <View className="w-full items-start justify-center border border-cyan-200 rounded-lg px-4">
              <TextInput
                className="w-full text-primary-400"
                value={formData.last_name}
                onChangeText={(text) => {
                  handleInputChange("last_name", text);
                }}
              />
            </View>
          </View>

          {/* phone */}
          <View className="w-full items-start justify-center gap-2">
            <Text className="text-primary-400 text-l">Phone number</Text>

            <View className="w-full items-start justify-center border border-cyan-200 rounded-lg px-4">
              <TextInput
                className="w-full text-primary-400"
                value={formData.phone}
                onChangeText={(text) => {
                  handleInputChange("phone", text);
                }}
              />
            </View>
          </View>

          {/* email */}
          <View className="w-full items-start justify-center gap-2">
            <Text className="text-primary-400 text-l">Email</Text>

            <View className="w-full items-start justify-center border border-cyan-200 rounded-lg px-4">
              <TextInput
                className="w-full text-primary-400"
                value={formData.email}
                onChangeText={(text) => {
                  handleInputChange("email", text);
                }}
              />
            </View>
          </View>

          {/* password */}
          <View className="w-full items-start justify-center gap-2">
            <Text className="text-primary-400 text-l">Password</Text>

            <View className="w-full items-start justify-center border border-cyan-200 rounded-lg px-4">
              <TextInput
                className="w-full text-primary-400"
                value={formData.password}
                onChangeText={(text) => {
                  handleInputChange("password", text);
                }}
                secureTextEntry
              />
            </View>
          </View>

          {loading ? (
            <ActivityIndicator size={"small"} />
          ) : (
            <TouchableOpacity
              className="w-full h-14 rounded-lg"
              onPress={onSubmit}
            >
              <LinearGradient
                colors={["#fb923c", "#22d3ee", "#fb923c", "#22d3ee"]}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="w-full h-full items-center justify-center rounded-lg overflow-hidden"
                style={{ borderRadius: 10 }}
              >
                <Text className="text-primary-400 font-semibold text-lg">
                  Submit
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </ScrollView>
      </BlurView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationForm;
