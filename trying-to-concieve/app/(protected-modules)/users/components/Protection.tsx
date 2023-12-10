"use client";
import { AuthProvider } from "@/app/context/AuthProvider";
import { permanentRedirect, redirect, useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

const Protection = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useLayoutEffect(() => {
    const authData = localStorage.getItem("authData");
    if(!authData || !JSON.parse(authData).accessToken) {
      router.replace("/users");
    }
  }, []);

  return <AuthProvider>{children}</AuthProvider>;
};

export default Protection;
