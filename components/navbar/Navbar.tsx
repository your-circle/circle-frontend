import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navlinks from "./Navlinks";
import UserDropdown from "./UserDropdown";

type PropTypes = {};

const Navbar: React.FC<PropTypes> = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  return (
    <nav className="max-h-[60px]">
      <section className="flex justify-between items-center px-2 p-1">
        <Link href="/">
          <span className=" flex items-center gap-2 cursor-pointer">
            <Image
              src="/images/logo.svg"
              layout="fixed"
              width="30"
              height="30"
            />

            <h1 className="text-white ">Circle</h1>
          </span>
        </Link>

        <section className="hidden md:flex  justify-around w-1/3 items-center">
          <div className=" flex justify-around w-3/4">
            <Navlinks />
          </div>
          <div className="flex  ">
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
        <section className="flex flex-col items-center md:hidden">
          <div className="flex-col flex">
            <Navlinks />
          </div>
          <div className="flex m-2 mb-5">
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
