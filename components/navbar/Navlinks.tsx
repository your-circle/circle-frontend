import Link from "next/link";
import React, { useContext } from "react";
import { userContext } from "../../providers/userProvider";

const Navlinks: React.FC = () => {

  const { isLoggedIn } =
    useContext(userContext);

  if (!isLoggedIn) {
    return <></>
  }

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
