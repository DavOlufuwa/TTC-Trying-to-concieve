import type { Metadata } from "next";
import { ReactNode } from "react";
import Protection from "@/components/Protection";

export const metadata: Metadata = {
  title: "TTC-Admin",
  description: "TTC Admin page",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <Protection link="/admin" children={children} />;
};

export default Layout;
