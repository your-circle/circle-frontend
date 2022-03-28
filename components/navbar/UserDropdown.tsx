import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../providers/userProvider";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const UserDropdown: React.FC = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState<Boolean>(false);
  const { user, isLoggedIn, updateUser, changeLogInStatus } =
    useContext(userContext);
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

  const Logout = () => {
    updateUser({});
    changeLogInStatus(false);
    router.push("/projects");
    toast.info("user logged out!");
  };

  return (
    <div className="flex items-center cursor-pointer relative">
      {isLoggedIn ? (
        <>
          <div className="flex items-center mr-4">
            <span
              className="select-none opacity-90 hover:opacity-100"
              onClick={() => {
                setShowDropdown(!showDropdown);
              }}
            >
              {user?.name || "username"}
            </span>
            <Image
              src={
                showDropdown
                  ? "/images/expand-up-icon.svg"
                  : "/images/expand-down-icon.svg"
              }
              alt="expand"
              className=""
              width={25}
              height={25}
              onClick={() => {
                setShowDropdown(!showDropdown);
              }}
            />
          </div>
          <div
            role="menu"
            className={`absolute top-[30px] right-0 mt-2 w-[200px] rounded-md  ${
              !showDropdown ? "hidden" : ""
            }`}
          >
            <Link href="/projects">
              <a
                className="block px-4 py-2 bg-secondary-bg hover:bg-secondary-bg text-sm  hover:opacity-80"
                role="menuitem"
              >
                My Projects
              </a>
            </Link>
            <Link href="/profile/edit">
              <a
                className="block px-4 py-2 bg-secondary-bg hover:bg-secondary-bg text-sm  hover:opacity-80"
                role="menuitem"
              >
                Profile
              </a>
            </Link>
            <a
              className="block px-4 py-2 bg-secondary-bg hover:bg-secondary-bg text-sm  hover:opacity-80"
              role="menuitem"
              onClick={Logout}
            >
              Logout
            </a>
          </div>
          <Image
            src="/images/login-icon.svg"
            alt="logout"
            width={25}
            height={25}
            className="opacity-100 hover:opacity-90 hover:scale-105 cursor-pointer"
            onClick={Logout}
          />
        </>
      ) : (
        <Link href="/login" passHref>
          <a className=" mx-2 p-[2px] rounded-md w-max h-max bg-gradient-to-br from-[#7362D1] to-[#618EB0]">
            <div className="flex flex-col justify-between h-full bg-secondary-bg rounded-md px-4 py-2">
              <h1 className="text-main-gradient font-black">Log in</h1>
            </div>
          </a>
        </Link>
      )}
    </div>
  );
};

export default UserDropdown;
