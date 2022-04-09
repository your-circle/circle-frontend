import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../providers/userProvider";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Button from "../../shared/components/Button";

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
    router.push("/login");
    toast.info("user logged out!");
  };

  return (
    <div className="flex items-center justify-between w-32 cursor-pointer relative">
      {isLoggedIn ? (
        <>
          <div className="flex items-center mr-5">
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
            <Link href={`/user/${user._id}`}>
              <a
                className="block px-4 py-2 bg-main-gray text-sm  hover:bg-secondary-bg"
                role="menuitem"
              >
                My Projects
              </a>
            </Link>
            <Link href={`/projects/new`}>
              <a
                className="block px-4 py-2 bg-main-gray text-sm  hover:bg-secondary-bg"
                role="menuitem"
              >
                Add Project
              </a>
            </Link>
            <Link href="/profile/edit">
              <a
                className="block px-4 py-2 bg-main-gray text-sm  hover:bg-secondary-bg"
                role="menuitem"
              >
                Profile
              </a>
            </Link>
            <a
              className="block px-4 py-2 bg-main-gray text-sm  hover:bg-secondary-bg"
              role="menuitem"
              onClick={Logout}
            >
              Logout
            </a>
          </div>
          <div className="flex items-center justify-center mx-3">
            <Link href="/notification">
              <Image
                src="/images/notification-icon.svg"
                layout="fixed"
                width="20"
                height="20"
              />
            </Link>
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
        <Button href="/login">
          <h1 className="text-opacity-80 hover:text-opacity-100 cursor-pointer duration-200 w-16 p-1 text-center">
            Login
          </h1>
        </Button>
      )}
    </div>
  );
};

export default UserDropdown;
