"use client";

import { AuthData, Contextvaluetype } from "@/types/users";
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext<Contextvaluetype | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const initialAuthData: AuthData = {
    id: "",
    email: "",
    fullName: "",
    role: 0,
    accessToken: "",
  };

  const storedAuth = typeof window !== undefined && JSON.parse(localStorage.getItem("authData") as string) ;
  const [auth, setAuth] = useState<AuthData>(storedAuth || initialAuthData);

  useEffect(() => {
    const authData = localStorage.getItem("authData") as string;
    const storedAuthData = JSON.parse(authData);

    if (!storedAuthData || storedAuthData.accessToken === "") {
      setAuth(initialAuthData);
    }
    else {
      setAuth({
        ...auth,
        id: storedAuthData.id,
        email: storedAuthData.email,
        fullName: storedAuthData.fullName,
        role: storedAuthData.role,
        accessToken: storedAuthData.accessToken,
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("authData", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
