import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../providers/userProvider";
import Image from "next/image";

const Navlinks: React.FC = () => {
  return (
    <>
      <Link href="/projects">
        <a className="opacity-80 hover:opacity-100 cursor-pointer hover:text-main-gradient duration-200">
          Projects
        </a>
      </Link>
      <Link href="/peers">
        <a className="opacity-80 hover:opacity-100 cursor-pointer hover:text-main-gradient duration-200">
          Peers
        </a>
      </Link>
    </>
  );
};

export default Navlinks;
