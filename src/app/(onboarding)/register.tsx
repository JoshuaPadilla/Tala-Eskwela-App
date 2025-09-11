import RegistrationForm from "@/src/components/registration-form";
import RoleSelectionForm from "@/src/components/role-selection";
import { Images } from "@/src/constants/images/image.constants";
import { Roles } from "@/src/enums/role.enum";
import { usePushNotifications } from "@/src/hooks/usePushNotification";
import { Parent } from "@/src/interfaces/parent.interface";
import { RegistrationFormInterface } from "@/src/interfaces/registration-form.interface";
import { Student } from "@/src/interfaces/student.interface";
import { Teacher } from "@/src/interfaces/teacher.interface";
import { useAuthStore } from "@/src/stores/auth.store";
import { ImageBackground } from "expo-image";
import React, { useState } from "react";

const Register = () => {
  const { register, loading } = useAuthStore();
  const { expoPushToken } = usePushNotifications();

  const [role, setRole] = useState<Roles | null>(null);
  const [registrationData, setRegistrationData] =
    useState<RegistrationFormInterface>({
      email: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      password: "",
      phone: "",
      push_token: "",
    });

  const [roleSelected, setRoleSelected] = useState(false);

  const handleSelecRole = (role: Roles) => {
    setRole(role);
    setRegistrationData((prev: RegistrationFormInterface) => ({
      ...prev,
      push_token: expoPushToken?.data,
    }));

    setRoleSelected(true);
  };

  const handleRegister = () => {
    if (!role) return;

    switch (role) {
      case Roles.PARENT:
        register(role, registrationData as Parent);
        return;
      case Roles.TEACHER:
        register(role, registrationData as Teacher);
        return;

      case Roles.STUDENT:
        register(role, registrationData as Student);
        return;
      default:
        return;
    }
  };

  return (
    <ImageBackground
      source={Images.registration_bg}
      contentFit="cover"
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 15,
        paddingVertical: 40,
      }}
    >
      {roleSelected ? (
        <RegistrationForm
          loading={loading}
          formData={registrationData}
          setFormData={setRegistrationData}
          onSubmit={handleRegister}
        />
      ) : (
        <RoleSelectionForm onSelect={handleSelecRole}></RoleSelectionForm>
      )}
    </ImageBackground>
  );
};

export default Register;
