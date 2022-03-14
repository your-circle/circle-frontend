import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar";
import { UserContextProvider } from "../providers/userProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <div className="bg-main-bg  text-white min-h-screen min-w-full">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </UserContextProvider>
  );
}

export default MyApp;
