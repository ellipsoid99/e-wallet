import Head from "next/head";
import type { AppProps } from "next/app";
import { createStore, applyMiddleware, Store } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import thunk from "redux-thunk";
import { SessionProvider } from "next-auth/react";
import useSWR, { SWRConfig } from "swr";
import axios from "axios";
import Layout from "@/components/Layout";
import { useStore } from "../store";
import "../styles/globals.scss";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const store = useStore(pageProps.initialReduxState);
    return (
        <ReduxProvider store={store}>
            <SessionProvider session={session}>
                <Layout>
                    {/* <SWRConfig
                        value={{
                            fetcher: (url) =>
                                axios({
                                    url,
                                    baseURL: process.env.NEXT_PUBLIC_API_URL,
                                }).then((r) => r.data),
                        }}
                    > */}
                    <Component {...pageProps} />
                    {/* </SWRConfig> */}
                </Layout>
            </SessionProvider>
        </ReduxProvider>
    );
}
// MyApp.getInitialProps = async (ctx) => {
//     const res = await fetch("https://api.github.com/repos/vercel/next.js");
//     const json = await res.json();
//     return { stars: json.stargazers_count };
// };

export default MyApp;
