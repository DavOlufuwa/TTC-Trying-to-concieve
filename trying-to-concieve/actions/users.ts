import axios from "@/lib/axios";
import { UserForm, loginData } from "@/types/users";

export const signUpNewUser = async (userInfo: UserForm) => {
  const response = await axios.post(
    "/api/users", userInfo
  )

  return response
};

export const signInNewUser = async (userInfo: loginData) => {
  const response = await axios.post("/api/auth/users", userInfo)

  return response
};

