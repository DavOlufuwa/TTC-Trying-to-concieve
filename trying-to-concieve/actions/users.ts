"use server";
import axios from "axios";
import { UserForm, loginData } from "@/types/users";
export const signUpNewUser = async (userInfo: UserForm) => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/users",
      userInfo
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const signInNewUser = async (userInfo: loginData) => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/auth/users",
      userInfo
    );
    return response.data;
  } catch (error : any) {
    return error.response.data.error
  }
};
