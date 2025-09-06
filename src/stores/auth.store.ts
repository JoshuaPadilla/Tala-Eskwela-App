import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { BASE_URL } from "../constants/base-url.constant";
import { Roles } from "../enums/role.enum";
import { Parent } from "../interfaces/parent.interface";
import { Student } from "../interfaces/student.interface";
import { Teacher } from "../interfaces/teacher.interface";

interface AuthStoreState {
  loading: boolean;
  user: Student | Teacher | Parent | null;
  login: (
    email: string,
    password: string,
    push_token?: string
  ) => Promise<void>;
  register: (role: Roles, form: Student | Teacher | Parent) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  loading: false,
  user: null,
  login: async (email, password, push_token) => {
    try {
      set({ loading: true });
      const res = await fetch(`${BASE_URL}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, push_token }),
      });

      const data = await res.json();
      console.log(data);
      if (data) {
        await AsyncStorage.setItem("accessToken", data.access_token);
        set({ user: data.user });
      } else {
        throw new Error("Failed to login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  register: async (role, form) => {
    try {
      console.log("Fetching ...");

      const res = await fetch(`${BASE_URL}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role, registrationForm: form }),
      });

      const data = await res.json();

      console.log(data);

      if (data) {
        await AsyncStorage.setItem("accessToken", data.data.access_token);
        set({ user: data.data.user });
      } else {
        throw new Error("Failed to register");
      }
    } catch (error) {
      console.log(error);
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      set({ user: null });
    } catch (error) {
      console.log(error);
    }
  },
}));
