import { BlurView } from "expo-blur";
import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Icons } from "../constants/icons/icons.constant";
import { Images } from "../constants/images/image.constants";
import { Roles } from "../enums/role.enum";
import { usePushNotifications } from "../hooks/usePushNotification";
import { useAuthStore } from "../stores/auth.store";
export default function Index() {
  const { expoPushToken } = usePushNotifications();

  const [email, setEmail] = useState<string>("");
  const [password, setPassord] = useState<string>("");

  const { user, login, loading } = useAuthStore();

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case Roles.PARENT:
          router.replace("/(auth_screens)/(parent)/parent_home");
          break;
        case Roles.TEACHER:
          router.replace("/(auth_screens)/(teacher)/teacher_home");
          break;
        case Roles.STUDENT:
          router.replace("/(auth_screens)/(student)/student_home");
          break;
        default:
          router.replace("/(onboarding)/login");
      }
    }
  }, [user]); // 👈 Add `user` to the dependency array

  const handleLogin = () => {
    if (!email || !password) return;

    login(email, password, expoPushToken?.data);
  };

  return (
    <ImageBackground
      source={Images.welcome_bg}
      contentFit="cover"
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 10,
      }}
    >
      <View className="flex h-[60%] items-center justify-center flex-1">
        <Image source={Icons.app_logo} style={{ height: 200, width: 200 }} />
      </View>

      <KeyboardAvoidingView
        className="h-[50%] w-full justify-end"
        behavior={Platform.OS === "ios" ? "padding" : "position"}
        keyboardVerticalOffset={0}
      >
        <BlurView
          intensity={70}
          tint="systemMaterialDark"
          className="size-full rounded-2xl overflow-hidden justify-start items-center p-10 gap-8"
        >
          <View className="items-center justify-center w-full">
            <Text className="font-bold text-cyan-300 text-3xl mb-4">Login</Text>

            <View className="w-full items-start justify-center gap-2">
              <Text className="text-primary-400 text-l">Email</Text>

              <View className="w-full items-start justify-center border border-cyan-200 rounded-lg px-4">
                <TextInput
                  className="w-full text-primary-400"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.nativeEvent.text);
                  }}
                />
              </View>
            </View>
          </View>

          <View className="w-full items-start justify-center gap-2">
            <Text className="text-primary-400 text-l">Password</Text>

            <View className="w-full items-start justify-center border border-cyan-200 rounded-lg px-4">
              <TextInput
                className="w-full text-primary-400"
                value={password}
                onChange={(e) => {
                  setPassord(e.nativeEvent.text);
                }}
                secureTextEntry
              />
            </View>
          </View>

          <View
            className="items-center justify-center w-full gap-2"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Text className="text-primary-400">No account yet?</Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/(onboarding)/register");
              }}
            >
              <Text className="text-cyan-300">Register here</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size={"small"} />
          ) : (
            <TouchableOpacity
              className="w-full h-14 rounded-lg"
              onPress={handleLogin}
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
        </BlurView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
