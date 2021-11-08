import { PropsWithChildren } from "react";
import { Header } from "@/components/header";

function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
