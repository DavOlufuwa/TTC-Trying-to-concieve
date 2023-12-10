import type { Metadata } from "next";
import { ReactNode } from "react";
import Protection from "@/components/Protection";

export const metadata: Metadata = {
  title: "TTC-Super Admin",
  description: "TTC Super Admin Page",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <Protection link="/superadmin" children={children} />;
};

export default Layout;
