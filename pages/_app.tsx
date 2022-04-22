import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar";
import { useEffect, useState } from 'react'
import { UserContextProvider } from "../providers/userProvider";
import Searchbar from "../components/searchbar";
import useAuth from "../hooks/useAuth";
function MyApp({ Component, pageProps }: AppProps) {



  // useEffect(() => {

  //   if (!window.localStorage.getItem("jwtToken")) {
  //     if (!(window.location.href.includes('login') || window.location.href.includes('signup') || window.location.href.split('/').length == 3 || window.location.href.split('/')[3] == '')) {
  //       window.location.href = '/'
  //     }
  //   }

  // }, [])

  useAuth()

  return (
    <UserContextProvider>
      {/* bg-main-bg */}
      <div className="static  text-white min-h-screen min-w-full">
        <ToastContainer />
        <Navbar />
        <Component {...pageProps} />
      </div>
    </UserContextProvider>
  );
}

export default MyApp;
