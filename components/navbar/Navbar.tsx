import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navlinks from "./Navlinks";
import UserDropdown from "./UserDropdown";

type PropTypes = {};

const Navbar: React.FC<PropTypes> = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  return (
    <nav className="w-full sticky top-0 py-3 z-10 bg-clip-text bg-gradient-to-tr from-[#B679D2] via-[#8FD89A] to-[#E8735C]">
      <section className="flex justify-between items-center px-3 p-1">
        <Link href="/">
          {/* <h1 className="text-2xl text-white cursor-pointer">circle</h1> */}
          <Image
            src={
              `/images/logo.png`
            }

            width={120}
            height={42}
            className=""
            alt="nav burger icon"
          />
        </Link>

        <section className="hidden md:flex gap-10 items-center">
          <div className=" flex justify-around gap-10 mx-1">
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
