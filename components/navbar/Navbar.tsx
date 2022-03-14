import React from "react";
import Link from "next/link";

type PropTypes = {};

const Navbar: React.FC<PropTypes> = () => {
  return (
    <nav className="flex justify-between">
      <Link href="/">Home</Link>
      <Link href="/projects">Projects</Link>
      <Link href="/people">People</Link>
    </nav>
  );
};

export default Navbar;
