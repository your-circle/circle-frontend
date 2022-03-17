import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../providers/userProvider";
import Image from "next/image";

const Navlinks: React.FC = () => {
  return (
    <>
      <Link href="/projects">
        <a className="opacity-80 hover:opacity-100 cursor-pointer m-1">Projects</a>
      </Link>
      <Link href="/people">
        <a className="opacity-80 hover:opacity-100 cursor-pointer m-1">People</a>
      </Link>
    </>
  );
};

export default Navlinks;
