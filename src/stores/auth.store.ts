import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { BASE_URL } from "../constants/base-url.constant";
import { Roles } from "../enums/role.enum";
import { Parent } from "../interfaces/parent.interface";
import { Student } from "../interfaces/student.interface";
import { Teacher } from "../interfaces/teacher.interface";

interface AuthStoreState {
  loading: boolean;
  isChecking: boolean;
  user: Student | Teacher | Parent | null;
  login: (
    email: string,
    password: string,
    push_token?: string
  ) => Promise<void>;
  register: (role: Roles, form: Student | Teacher | Parent) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  loading: false,
  isChecking: false,
  user: null,
  login: async (email, password, push_token) => {
    console.log(email);
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
    console.log("Registration form:", form);
    try {
      set({ loading: true });

      const res = await fetch(`${BASE_URL}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role, registrationForm: form }),
      });

      const data = await res.json();

      if (data) {
        await AsyncStorage.setItem("accessToken", data.data.access_token);
        set({ user: data.data.user });
      } else {
        throw new Error("Failed to register");
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
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

  checkAuth: async () => {
    try {
      set({ isChecking: true });

      const accessToken = await AsyncStorage.getItem("accessToken");

      if (!accessToken) {
        console.log("no token found");
        return;
      }

      const res = await fetch(`${BASE_URL}auth/check`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (data) {
        set({ user: data });
      } else {
        console.log("No data");
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isChecking: false });
    }
  },
}));
