import { useFathom } from "@hooks/useFathom";

function CustomApp({ Component, pageProps }) {
  useFathom()

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default CustomApp;
