"use server";

import axios from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";
interface Formdata {
  fullName: string;
  email: string;
  password: string;
}

export const signUpSuperAdmin = async (formData: Formdata) => {
  try {
    const response = await axios.post("/api/admin", formData);
    console.log(response.data);
  } catch (error : any) {
    console.log(error.response.data.error);
  }
};


export const signInSuperAdmin = async (formData: Formdata) => {
  try {
    const response = await axios.post("/api/auth/admin", formData);
    console.log(response.data);
  } catch (error : any) {
    console.log(error.response.data.error);
  }
}


export const getAllUsers = async () => {
  try {
    const response = await axiosAuth.get("/api/users");
    console.log(response.data);
  } catch (error : any) {
    console.log(error.response.data.error);
  }
}