import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar";
import { UserContextProvider } from "../providers/userProvider";
import { ThemeProvider } from "../providers/themeProvider";
import useAuth from "../hooks/useAuth";
function MyApp({ Component, pageProps }: AppProps) {
  useAuth();

  return (
    <UserContextProvider>
      <ThemeProvider>
        <div className="static  text-white min-h-screen min-w-full">
          <ToastContainer />
          <Navbar />
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default MyApp;
