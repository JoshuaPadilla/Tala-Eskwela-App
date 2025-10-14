import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { BASE_URL } from "../constants/base-url.constant";
import { Student } from "../interfaces/student.interface";

interface StudentStoreState {
  loading: boolean;
  selectedStudent: Student | null;
  students: Student[];
  getStudents: (query?: string) => Promise<Student[] | undefined>;
  getStudent: (student_id: string) => void;
  setStudentToRegister: (student_id: string) => void;
  updateStudents: (data: Partial<Student>) => void;
  updateSelectedStudent: (data: Partial<Student>) => void;
  deleteStudent: (student_id: string) => Promise<void>;
  setSelectedStudent: (student: Student) => void;
  addParent: (student_id: string, parent_id: string) => void;
}

export const useStudentStore = create<StudentStoreState>((set) => ({
  selectedStudent: null,
  loading: false,
  students: [],
  getStudents: async (query) => {
    try {
      set({ loading: true });
      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}students${query ? query : ""}`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (data) {
        return data as Student[];
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
      const accessToken = await AsyncStorage.getItem("accessToken");
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
  deleteStudent: async (student_id: string) => {
    try {
      set({ loading: true });
      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}students/${student_id}`, {
        method: "Delete",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.ok) {
        set((state) => {
          const updatedStudents = state.students.filter(
            (student) => student.id !== student_id
          );

          return {
            students: updatedStudents,
          };
        });
      } else {
        throw new Error("No students found");
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  setSelectedStudent: (student) => {
    set({ selectedStudent: student });
  },
  addParent: async (student_id, parent_id) => {
    console.log(student_id, parent_id);
    try {
      set({ loading: true });
      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}students/addParent`, {
        method: "Post",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ student_id, parent_id }),
      });

      const data = await res.json();

      if (res.ok) {
        set((state) => {
          if (
            !state.selectedStudent ||
            typeof state.selectedStudent.id !== "string"
          ) {
            return { selectedStudent: null };
          }
          const updatedStudent: Student = {
            ...state.selectedStudent,
            parent: data,
            id: state.selectedStudent.id ?? "",
          };

          return { selectedStudent: updatedStudent };
        });
      } else {
        throw new Error("No students found");
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  updateSelectedStudent: (data) => {
    set((state) => {
      const updatedStudent = { ...state.selectedStudent, ...data } as Student;
      return { selectedStudent: updatedStudent };
    });
  },
}));
