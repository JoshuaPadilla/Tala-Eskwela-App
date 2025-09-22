import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { create } from "zustand";
import { BASE_URL } from "../constants/base-url.constant";
import { CreateUserDto } from "../dto/create-user.dto";
import { Roles } from "../enums/role.enum";
import { objectJsonFormatter } from "../helpers/objectJsonFormatter";
import { Admin } from "../interfaces/admin.interface";
import { Parent } from "../interfaces/parent.interface";
import { Student } from "../interfaces/student.interface";
import { Teacher } from "../interfaces/teacher.interface";

interface AuthStoreState {
  loading: boolean;
  isChecking: boolean;
  user: Teacher | Student | Parent | Admin | null;
  teacherUser: Teacher | null;
  studentUser: Student | null;
  parentUser: Parent | null;
  adminUser: Admin | null;
  login: (
    email: string,
    password: string,
    push_token?: string
  ) => Promise<void>;
  register: (role: Roles, form: CreateUserDto) => void;
  logout: () => void;
  checkAuth: () => void;
  setParsedUser: (data: any) => void;
}

export const useAuthStore = create<AuthStoreState>((set, get) => ({
  loading: false,
  user: null,
  isChecking: false,
  teacherUser: null,
  studentUser: null,
  parentUser: null,
  adminUser: null,
  login: async (email, password, push_token) => {
    const { setParsedUser } = get();

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
        objectJsonFormatter(data);
        await AsyncStorage.setItem("accessToken", data.access_token);
        setParsedUser(data.user);
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
    const { setParsedUser } = get();

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
        setParsedUser(data.data.user);
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
      set({
        teacherUser: null,
        studentUser: null,
        parentUser: null,
        adminUser: null,
        user: null,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  },

  checkAuth: async () => {
    const { setParsedUser } = get();
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
        setParsedUser(data);
      } else {
        console.log("No data");
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isChecking: false });
    }
  },

  setParsedUser: (userData) => {
    switch (userData.role) {
      case "teacher":
        set({ teacherUser: userData, user: userData });
      case "student":
        set({ studentUser: userData, user: userData });
      case "parent":
        set({ parentUser: userData, user: userData });
      case "admin":
        set({ adminUser: userData, user: userData });
      default:
        return null;
    }
  },
}));
