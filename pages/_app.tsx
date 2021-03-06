import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import customTheme from "@/styles/theme";
import Layout from "@/components/layout";
import { Loading } from "@/components/atoms";
import { WagmiConfig, createClient, defaultChains, configureChains } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ alchemyId: "tKl4iTNalnRA_fmULL4487sHZsFVIWDw" }),
]);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [routerIsLoading, setRouterIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== router.pathname) setRouterIsLoading(true);
      else setRouterIsLoading(false);
    };
    const handleComplete = (_url: string) => setRouterIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <WagmiConfig client={client}>
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
          <link rel="preload" href="/fonts/Inter-Bold.ttf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/Inter-Regular.ttf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/CoFo_Rax_V0.1.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/RuneScape-UF.woff2" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/RuneScape-UF.woff" as="font" crossOrigin="" />
        </Head>
        <Layout>
          {routerIsLoading && <Loading />}
          {!routerIsLoading && <Component {...pageProps} />}
        </Layout>
      </ChakraProvider>
    </WagmiConfig>
  );
}
export default MyApp;
