import type { Metadata } from "next";
import { ReactNode } from "react";
import Protection from "./components/Protection";


export const metadata: Metadata = {
  title: "TTC-user",
  description: "TTC user page",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <Protection children={children}/>
};

export default Layout;
