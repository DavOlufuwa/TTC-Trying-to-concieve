"use server";
import axios from "axios";

interface Formdata {
  fullName: string;
  email: string;
  password: string;
}

export const signUpSuperAdmin = async (formData: Formdata) => {
  try {
    const response = await axios.post("http://localhost:5050/api/superadmin", formData);
    console.log(response.data);
  } catch (error) {
    console.log(error)
  }
}