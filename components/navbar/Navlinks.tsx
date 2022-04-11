import Link from "next/link";
import React from "react";

const Navlinks: React.FC = () => {
  return (
    <>
      <Link href="/projects">
        <a className="opacity-80 hover:opacity-100 cursor-pointer duration-200">
          Projects
        </a>
      </Link>
      <Link href="/peers">
        <a className="opacity-80 hover:opacity-100 cursor-pointer duration-200">
          Peers
        </a>
      </Link>
    </>
  );
};

export default Navlinks;
