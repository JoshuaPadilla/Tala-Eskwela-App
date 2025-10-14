import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { BASE_URL } from "../constants/base-url.constant";
import { Roles } from "../enums/role.enum";
import { useStudentStore } from "./student.store";

interface StoreState {
  uploadProfile: (imageUri: string, userId: string) => void;
  loading: boolean;
}

export const useUploadStore = create<StoreState>((set) => ({
  loading: false,
  uploadProfile: async (imageUri, userId) => {
    if (!imageUri) return;

    try {
      set({ loading: true });

      const accessToken = await AsyncStorage.getItem("accessToken");

      if (!accessToken) {
        console.log("no token found");
        return;
      }

      const filename = imageUri.split("/").pop();
      const fileExtension = filename?.split(".").pop();
      const fileType = `image/${fileExtension === "jpg" ? "jpeg" : fileExtension}`;

      const formData = new FormData();
      //   formData.append('profile_picture')
      formData.append("profile_picture", {
        // <-- MUST match NestJS FileInterceptor('picture')
        uri: imageUri,
        name: filename,
        type: fileType,
      } as any);

      formData.append("userId", userId);
      formData.append("role", Roles.STUDENT);

      const res = await fetch(`${BASE_URL}upload/profile_picture`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        useStudentStore
          .getState()
          .updateSelectedStudent({ profileUrl: data.profileUrl });
      } else {
        console.error("Upload failed:", data);
        alert(`Upload failed: ${data.message || "Server Error"}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
