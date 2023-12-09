"use client";

import { AuthData, Contextvaluetype } from "@/types/users";
import { createContext, useState } from "react";



const AuthContext = createContext<Contextvaluetype | undefined>(undefined);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [auth, setAuth] = useState<AuthData>(
    {
      id: "",
      email: "",
      fullName: "",
      role: 0,
      accessToken: "",
    });



  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthContext
