import { useAuthStore } from "@/src/stores/auth.store";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const { login } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <View className="bg-primary-300">
        <Text>Email</Text>
        <TextInput
          value={email}
          onChange={(e) => setEmail(e.nativeEvent.text)}
          className="w-[200px] border-black-100 border-2 rounded-md"
        />

        <Text>Password</Text>
        <TextInput
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChange={(e) => setPassword(e.nativeEvent.text)}
          className="w-[200px] border-black-100 border-2 rounded-md"
        />
      </View>

      <TouchableOpacity
        hitSlop={10}
        onPress={() => login(email, password)}
        className="mt-10"
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
