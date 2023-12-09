"use server";
import axios from "@/lib/axios";
import { UserForm, loginData } from "@/types/users";

export const signUpNewUser = async (userInfo: UserForm) => {
  try {
    const response = await axios.post(
      "/api/users",
      userInfo
    );
    return response.data;
  } catch (error : any) {
    return error.response.data.error
  }
};

export const signInNewUser = async (userInfo: loginData) => {
  try {
    const response = await axios.post(
      "/api/auth/users",
      userInfo
    );
    return response.data;
  } catch (error : any) {
    return error.response.data.error
  }
};

