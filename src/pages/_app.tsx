import "@/styles/globals.css";
import { CookiesProvider } from "react-cookie";
import Layout from "@/layout/Layout";

import { RecoilRoot } from "recoil";

import { QueryClient, QueryClientProvider } from "react-query";

import type { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <RecoilRoot>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>
      </CookiesProvider>
    </QueryClientProvider>
  );
}
