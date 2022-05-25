import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navlinks from "./Navlinks";
import UserDropdown from "./UserDropdown";
import { userContext } from "../../providers/userProvider";
import { themeContext } from "../../providers/themeProvider";

type PropTypes = {};

const Navbar: React.FC<PropTypes> = () => {
  const { theme, updateTheme } = useContext(themeContext);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const { user, isLoggedIn, updateUser, changeLogInStatus } =
    useContext(userContext);

  return (
    <nav
      className={`w-full sticky top-0 px-4 py-3 z-50 ${
        theme === "light"
          ? "bg-light-theme-bg text-[#202020]"
          : "bg-main-bg text-white"
      }`}
    >
      <section className="flex justify-between items-center px-3 p-1">
        <Link href="/">
          <h1 className="text-2xl hover:text-blue-500 transition-all cursor-pointer">
            circle
          </h1>
        </Link>

        <>
          <section className="hidden md:flex gap-10 items-center">
            {theme === "light" ? (
              <svg
                onClick={() => updateTheme("dark")}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            ) : (
              <svg
                onClick={() => updateTheme("light")}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
            <div className=" flex justify-around gap-10 mx-1">
              <Navlinks />
            </div>
            <div className="flex">
              <UserDropdown />
            </div>
          </section>
        </>

        <div
          className="md:hidden flex items-center cursor-pointer m-3"
          onClick={() => {
            setIsMobileNavOpen(!isMobileNavOpen);
          }}
        >
          <Image
            src={
              isMobileNavOpen
                ? `/images/burger-close.svg`
                : `/images/burger.svg`
            }
            layout="fixed"
            width={20}
            height={20}
            className=""
            alt="nav burger icon"
          />
        </div>
      </section>
      {isMobileNavOpen ? (
        <section className="flex flex-col space-y-4 items-center md:hidden pb-5">
          <div className="flex flex-col items-center space-y-4 z-10 ">
            <Navlinks />
          </div>
          <div className="flex gap-4 m-2 mb-5">
            <UserDropdown />
          </div>
        </section>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Navbar;
