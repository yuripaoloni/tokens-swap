import "../styles/globals.css";
import type { AppProps } from "next/app";

import { Web3ReactProvider } from "@web3-react/core";

import { getLibrary } from "../utils/web3react";

import { AlertProvider } from "../contexts/AlertContext";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AlertProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AlertProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
