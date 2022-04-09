import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navlinks from "./Navlinks";
import UserDropdown from "./UserDropdown";

type PropTypes = {};

const Navbar: React.FC<PropTypes> = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  return (
    <nav className="w-full sticky top-0 py-1 z-10 backdrop-filter backdrop-blur-lg">
      <section className="flex justify-between items-center px-3 p-1">
        <Link href="/">
          <h1 className="text-2xl text-main-gradient cursor-pointer">circle</h1>
        </Link>

        <section className="hidden md:flex justify-around w-1/3 items-center">
          <div className=" flex justify-around w-3/4 mx-1">
            <Navlinks />
          </div>
          <div className="flex">
            <UserDropdown />
          </div>
        </section>
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
