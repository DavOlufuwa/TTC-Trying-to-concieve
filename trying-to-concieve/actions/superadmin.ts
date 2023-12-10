import axios from "@/lib/axios";
interface Formdata {
  fullName: string;
  email: string;
  password: string;
}

export const signUpSuperAdmin = async (formData: Formdata) => {
  const response = await axios.post("/api/superadmin", formData);
  return response
}