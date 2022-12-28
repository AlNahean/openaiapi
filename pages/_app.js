// import '../styles/globals.css'
import { GlobalProvider } from "../Context/GlobalContext.jsx";

import "../styles/index.scss";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </>
  );
}
