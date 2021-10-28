import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { PropsWithChildren } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { Header } from "../components/header";

function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
export default MyApp;
