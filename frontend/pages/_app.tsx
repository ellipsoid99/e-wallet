import Head from "next/head";
import "../styles/globals.css";
import "../styles/customcss.scss";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  <Head>
    <title>E-Wallet App</title>
    <meta name="description" content="Created by Nirjhar and Soham" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head>;
  return <Component {...pageProps} />;
}

export default MyApp;
