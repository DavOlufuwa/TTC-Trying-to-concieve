
export interface UserForm {
  fullName: string;
  age: string;
  gender: string;
  dateOfBirth: string;
  country: string;
  email: string;
  address: string;
  phoneNumber: string;
  partnerFullName: string;
  partnerAge: string;
  partnerGender: string;
  partnerEmail: string;
  partnerPhoneNumber: string;
  medicalHistory: string;
  password: string;
}

export type loginData = {
  email: string;
  password: string;
}

export interface AuthData {
  id: String;
  email: String;
  fullName: String;
  role: Number;
  accessToken: String;
}

export interface Contextvaluetype {
  auth: AuthData;
  setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
}

