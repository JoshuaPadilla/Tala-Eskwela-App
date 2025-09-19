import { BlurView } from "expo-blur";
import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Images } from "../constants/images/image.constants";
import { usePushNotifications } from "../hooks/usePushNotification";
import { useAuthStore } from "../stores/auth.store";
export default function Index() {
  const { expoPushToken } = usePushNotifications();

  const [email, setEmail] = useState<string>("");
  const [password, setPassord] = useState<string>("");

  const { login, loading, isChecking } = useAuthStore();

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
        justifyContent: "center",
        padding: 10,
      }}
    >
      <View className="mt-20 flex h-[60%] items-center justify-center flex-1 flex-wrap w-[250px] flex-row">
        <Image source={Images.alvin} style={{ height: 100, width: 100 }} />
        <Image source={Images.rovel} style={{ height: 100, width: 100 }} />
        <Image source={Images.dino} style={{ height: 100, width: 100 }} />
        <Image source={Images.jenjen} style={{ height: 100, width: 100 }} />
      </View>

      {isChecking ? (
        <View className="h-[40%]">
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <KeyboardAvoidingView
          className="h-[50%] w-full justify-end"
          behavior={Platform.OS === "ios" ? "position" : "position"}
          keyboardVerticalOffset={0}
        >
          <BlurView
            intensity={70}
            tint="systemMaterialDark"
            className="size-full rounded-2xl overflow-hidden justify-start items-center p-10 gap-8"
          >
            <View className="items-center justify-center w-full">
              <Text className="font-bold text-cyan-300 text-3xl mb-4">
                Login
              </Text>

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
      )}
    </ImageBackground>
  );
}
