import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "TTC-user",
  description: "TTC user page",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export default Layout;
