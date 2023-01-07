import { useFathom } from "@hooks/useFathom";
import { Footer } from "@components/navigation";

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
