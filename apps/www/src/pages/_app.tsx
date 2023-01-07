import { useFathom } from "@hooks/useFathom";
import { Footer } from "@components/navigation";
import '@styles/index.scss'

function CustomApp({ Component, pageProps }) {
  useFathom()

  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default CustomApp;
