import { create } from "zustand";
import { BASE_URL } from "../constants/base-url.constant";

interface ChangeModeState {
  loading: boolean;
  changeMode: () => void;
}

export const useChangeMode = create<ChangeModeState>((set) => ({
  loading: false,
  changeMode: async () => {
    try {
      set({ loading: true });
      await fetch(`${BASE_URL}change_mode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mode: "register" }),
      });
    } catch (error) {
      console.log(error);
    }
  },
}));
