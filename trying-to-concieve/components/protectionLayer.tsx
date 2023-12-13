"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const protectionLayer = (
  WrappedComponent: React.ComponentType<any>,
  link: string,
) => {
  const ProtectedComponent = ({children, props}: any) => {
    const router = useRouter();

    useEffect(() => {
      const authData = localStorage.getItem("authData") as string;
      const storedAuth = JSON.parse(authData);
      if (!storedAuth || !storedAuth.accessToken) {
        router.replace(link);
      }
    }, [router, link]);

    return <WrappedComponent {...props}>{children}</WrappedComponent>;
  };

  return ProtectedComponent;
};

export default protectionLayer;
