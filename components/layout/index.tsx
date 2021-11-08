import React, { ReactNode } from "react";
import Header from "@/components/header";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

export default Layout;
