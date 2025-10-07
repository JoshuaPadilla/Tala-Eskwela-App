import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { BASE_URL } from "../constants/base-url.constant";
import { Parent } from "../interfaces/parent.interface";

interface ParentStoreState {
  loading: boolean;
  parents: Parent[];
  parentsForAddingStudents: Parent[];
  getParents: (query?: string) => void;
  getParentsForAddingStudents: (student_id: string) => void;
}

export const useParentStore = create<ParentStoreState>((set) => ({
  loading: false,
  parents: [],
  parentsForAddingStudents: [],
  getParents: async (query) => {
    try {
      set({ loading: true });
      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}parents${query ? query : ""}`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (data) {
        set({ parents: data });
      } else {
        throw new Error("No parents found");
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  getParentsForAddingStudents: async (student_id) => {
    try {
      set({ loading: true });
      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}parents/add_student/${student_id}`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (data) {
        console.log(data);
        set({ parentsForAddingStudents: data });
      } else {
        throw new Error("No parents found");
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
