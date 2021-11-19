import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@/components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
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
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
export default MyApp;
