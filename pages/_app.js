import "../styles/globals.css";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>MemoryLane</title>
      </Head>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}

export default App;
