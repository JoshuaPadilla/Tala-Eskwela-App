import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { BASE_URL } from "../constants/base-url.constant";
import { Subject } from "../interfaces/subject.interface";

interface SubjectStoreState {
  loading: boolean;
  subjects: Subject[];
  createSubject: (form: Omit<Subject, "subject_id">) => Promise<void>;
  deleteSubject: (id: string) => Promise<void>;
  getAllSubject: () => void;
}

export const useSubjectStore = create<SubjectStoreState>((set) => ({
  loading: false,
  subjects: [],
  createSubject: async (form) => {
    try {
      set({ loading: true });

      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}subject`, {
        method: "Post",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.error) {
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
  deleteSubject: async (id) => {
    try {
      set({ loading: true });

      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}subject/${id}`, {
        method: "Delete",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.status === 200) {
        set((state) => {
          const updatedSubjects = state.subjects.filter(
            (subject) => subject.subject_id !== id
          );

          return { subjects: updatedSubjects };
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
