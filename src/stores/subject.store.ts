import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { BASE_URL } from "../constants/base-url.constant";
import { Subject } from "../interfaces/subject.interface";

interface SubjectStoreState {
  loading: boolean;
  subjects: Subject[];
  createSubject: (form: Omit<Subject, "subject_id">) => void;
  getAllSubject: () => void;
}

export const useSubjectStore = create<SubjectStoreState>((set) => ({
  loading: false,
  subjects: [],
  createSubject: async (form) => {
    try {
      set({ loading: true });

      const accessToken = AsyncStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}subject`, {
        method: "Post",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (data) {
        set((state) => ({
          subjects: [...state.subjects, data],
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  getAllSubject: async () => {
    try {
      set({ loading: true });

      const accessToken = AsyncStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}subject`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (data) {
        set({ subjects: data });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
