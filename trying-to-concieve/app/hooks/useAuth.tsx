"use client"
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Contextvaluetype } from "@/types/users";

const useAuth = () : Contextvaluetype => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within a MyAuthContextProvider");
  }
  return context;
}

export default useAuth