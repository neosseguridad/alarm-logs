import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return <>
    <Head>
      <title>Bitácora</title>
    </Head>
    <Component {...pageProps} />
  </>;
}
