import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar";
import { useEffect, useState } from 'react'
import { UserContextProvider } from "../providers/userProvider";
import Sidebar from "../components/sidebar";
import useAuth from "../hooks/useAuth";
function MyApp({ Component, pageProps }: AppProps) {

  // useAuth()
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
