import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { BASE_URL } from "../constants/base-url.constant";
import { Student } from "../interfaces/student.interface";

interface StudentStoreState {
  loading: boolean;
  selectedStudent: Student | null;
  students: Student[];
  getStudents: () => void;
  getStudent: (student_id: string) => void;
  setStudentToRegister: (student_id: string) => void;
  updateStudents: (data: Partial<Student>) => void;
}

export const useStudentStore = create<StudentStoreState>((set) => ({
  selectedStudent: null,
  loading: false,
  students: [],
  getStudents: async () => {
    try {
      set({ loading: true });
      const accessToken = AsyncStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}students`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (data) {
        set({ students: data });
      } else {
        throw new Error("No students found");
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  getStudent: async (student_id) => {
    try {
      set({ loading: true });
      const accessToken = AsyncStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}students/${student_id}`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (data) {
        set({ selectedStudent: data });
      } else {
        throw new Error("No students found");
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  setStudentToRegister: async (student_id) => {
    try {
      set({ loading: true });
      await fetch(`${BASE_URL}students/setStudentToRegister`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: student_id }),
      });
    } catch (error) {
      console.log(error);
    }
  },
  updateStudents: (data) => {
    set((state) => {
      const updatedStudents = state.students.map((student) =>
        student.id === state.selectedStudent?.id
          ? { ...student, ...data }
          : student
      );
      return {
        students: updatedStudents,
      };
    });
  },
}));
