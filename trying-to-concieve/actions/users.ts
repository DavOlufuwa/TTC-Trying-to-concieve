"use server"
import axios from "axios";
import { UserForm } from "@/types/users";
export const signUpNewUser = async (userInfo : UserForm) => {
  try {
    const response = await axios.post("http://localhost:5050/api/users", userInfo);
    console.log(response.data);

  } catch (error) {
    console.log(error);
  }
}
