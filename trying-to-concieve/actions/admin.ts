import axios from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";
interface Formdata {
  fullName: string;
  email: string;
  password: string;
}

export const signUpAdmin = async (formData: Formdata) => {
  const response = await axios.post("/api/admin", formData);
  return response
};

export const signInAdmin = async (formData: Formdata) => {
  const response = await axios.post("/api/auth/admin", formData);
  return response
}

export const getAllUsers = async () => {
  const response = await axiosAuth.get("/api/users");
  return response
}