import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { BASE_URL } from "../constants/base-url.constant";
import { Parent } from "../interfaces/parent.interface";

interface ParentStoreState {
  loading: boolean;
  parents: Parent[];
  getParents: (query?: string) => void;
}

export const useParentStore = create<ParentStoreState>((set) => ({
  loading: false,
  parents: [],
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
}));
