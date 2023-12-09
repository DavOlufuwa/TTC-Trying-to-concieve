
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