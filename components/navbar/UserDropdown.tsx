import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../providers/userProvider";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Button from "../../shared/components/Button";
import useMediaQuery from "../../hooks/useMediaQuery";
import { AiOutlineUser } from 'react-icons/ai'
import { BsBookmarkPlus } from 'react-icons/bs'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { FiLogOut } from 'react-icons/fi'

const UserDropdown: React.FC = () => {
  const isMobileView = useMediaQuery("(max-width:768px)");
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
    <div
      className={`flex items-center justify-between w-32 cursor-pointer relative ${isMobileView ? "flex-col space-y-4" : ""
        } `}
    >
      {isLoggedIn ? (
        <>
          <div className={`flex items-center ${isMobileView ? "" : "mr-3"}`}>
            <span
              className={`select-none opacity-80 hover:opacity-100`}
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
              className="opacity-80 hover:opacity-100"
              width={25}
              height={25}
              onClick={() => {
                setShowDropdown(!showDropdown);
              }}
            />
          </div>
          <div
            role="menu"
            className={`absolute top-[30px] right-0 mt-2 w-[200px] rounded-md z-10 ${!showDropdown ? "hidden" : ""
              }`}
          >
            {/* <Link href={`/user/${user._id}`}>
              <a
                className="block px-4 py-2 bg-main-gray text-sm opacity-80  hover:bg-secondary-bg"
                role="menuitem"
              >
                My Projects
              </a>
            </Link> */}
            <Link href={`/user/${user._id}`}>
              <a
                className="flex items-center gap-2 px-4 py-2 bg-main-gray text-sm opacity-80  hover:bg-secondary-bg"
                role="menuitem"
              >
                <AiOutlineUser /> <span>Profile</span>
              </a>
            </Link>
            <Link href={`/projects/new`}>
              <a
                className="flex items-center gap-2 px-4 py-2 bg-main-gray text-sm opacity-80 hover:bg-secondary-bg"
                role="menuitem"
              >
                <BsBookmarkPlus></BsBookmarkPlus> <span> Add Project</span>
              </a>
            </Link>
            <Link href={`/notification`}>
              <a
                className="flex items-center gap-2 px-4 py-2 bg-main-gray text-sm opacity-80 hover:bg-secondary-bg"
                role="menuitem"
              >
                <IoMdNotificationsOutline></IoMdNotificationsOutline> <span> Notifications</span>
              </a>
            </Link>
            <a
              className="flex items-center gap-2 px-4 py-2 bg-main-gray text-sm opacity-80  hover:bg-secondary-bg"
              role="menuitem"
              onClick={Logout}
            >
              <FiLogOut></FiLogOut> <span>Logout</span>
            </a>
          </div>
          <div className="flex items-center justify-center mr-2">
            {/* <Link href="/notification">
              {isMobileView ? (
                <span
                  className={isMobileView ? "opacity-80 hover:opacity-100" : ""}
                >
                  Notifications
                </span>
              ) : (
                <Image
                  src="/images/notification-icon.svg"
                  alt="notifications"
                  layout="fixed"
                  width="20"
                  height="20"
                />
              )}
            </Link> */}
          </div>
          {isMobileView ? (
            <span
              className={isMobileView ? "opacity-80 hover:opacity-100" : ""}
            >
              Logout
            </span>
          ) : (
            <FiLogOut size={20}></FiLogOut>
          )}
        </>
      ) : (
        <div className="flex items-center">
          <Button href="/login">
            <h1 className="text-opacity-80 hover:text-opacity-100 cursor-pointer duration-200 w-16 p-1 text-center">
              Login
            </h1>
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
