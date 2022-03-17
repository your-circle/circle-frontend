import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../providers/userProvider";
import Image from "next/image";

const UserDropdown: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState<Boolean>(false);
  const { user } = useContext(userContext);
  // handle dropdown outside click
  useEffect(() => {
    if (!showDropdown) return;
    const handleOutsideClick = () => {
      setShowDropdown(false);
    };
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showDropdown]);
  return (
    <div className="flex items-center cursor-pointer relative">
      {user.isLoggedIn ? (
        <>
          <span
            className="select-none opacity-90 hover:opacity-100"
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
          >
            {user?.name || "username"}
          </span>
          <Image
            src={showDropdown ? "/images/expand-up-icon.svg" : "/images/expand-down-icon.svg"}
            alt="expand"
            className=""
            width={25}
            height={25}
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
          />
          <div
            role="menu"
            className={`absolute top-[30px] right-0 mt-2 w-[200px] rounded-md  ${!showDropdown ? "hidden" : ""}`}
          >
            <Link href="/projects">
              <a
                className="block px-4 py-2 bg-secondary-bg hover:bg-secondary-bg text-sm  hover:opacity-80"
                role="menuitem"
              >
                My Projects
              </a>
            </Link>
            <Link href="/profile">
              <a
                className="block px-4 py-2 bg-secondary-bg hover:bg-secondary-bg text-sm  hover:opacity-80"
                role="menuitem"
              >
                Profile
              </a>
            </Link>
            <Link href="/logout">
              <a
                className="block px-4 py-2 bg-secondary-bg hover:bg-secondary-bg text-sm  hover:opacity-80"
                role="menuitem"
              >
                Logout
              </a>
            </Link>
          </div>
          <Image
            src="/images/login-icon.svg"
            alt="logout"
            width={25}
            height={25}
            className="opacity-100 hover:opacity-90 hover:scale-105 cursor-pointer"
          />
        </>
      ) : (
        <h1>login</h1>
      )}
    </div>
  );
};

export default UserDropdown;
