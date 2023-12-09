import type { Metadata } from "next";
import { ReactNode } from "react";
import { AuthProvider } from "../context/AuthProvider";

export const metadata: Metadata = {
  title: "TTC-user",
  description: "TTC user page",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Layout;
