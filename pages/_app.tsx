import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import customTheme from "@/styles/theme";
import Layout from "@/components/layout";
import Web3ContextProvider from "@/contexts/Web3Context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ContextProvider>
      <ChakraProvider theme={customTheme}>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link
            href="https://uploads-ssl.webflow.com/6026543af66b1305fa436c0d/603691e91912788138ae9e47_MF-FAVICON-32.gif"
            rel="shortcut icon"
            type="image/x-icon"
          />
          <link
            href="https://uploads-ssl.webflow.com/6026543af66b1305fa436c0d/60369258d2d2b4eb12e73592_webclip.svg"
            rel="apple-touch-icon"
          />
          <link rel="preload" href="/fonts/188 Sans-Pixel 70.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/188 Sans-Black Extended.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/188 Sans-Bold.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/188 Sans-Pixel 100.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/188 Sans-Regular.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/188 Sans-Thin Condensed.otf" as="font" crossOrigin="" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Web3ContextProvider>
  );
}
export default MyApp;
