import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../providers/userProvider";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Button from "../../shared/components/Button";
import useMediaQuery from "../../hooks/useMediaQuery";
import { AiOutlineUser } from "react-icons/ai";
import { BsBookmarkPlus } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { setInterval } from "timers";
import { getNotificationStatus } from "../../shared/services/notification.services";
import { toastConfig } from "../../shared/config/constants";

const UserDropdown: React.FC = () => {
  const isMobileView = useMediaQuery("(max-width:768px)");
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState<Boolean>(false);
  const [isNewNotification, setIsNewNotification] = useState<Boolean>(false);

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

  useEffect(() => {
    // console.log(user)

    if (!isLoggedIn) {
      return;
    }
    getNotificationStatus()
      .then((res) => {
        setIsNewNotification(res.data);
      })
      .catch(() => {
        setIsNewNotification(false);
      });

    const notification_loop = setInterval(async () => {
      getNotificationStatus()
        .then((res) => {
          setIsNewNotification(res.data);
        })
        .catch(() => {
          setIsNewNotification(false);
        });
    }, 10000);

    return () => {
      clearInterval(notification_loop);
    };
  }, []);

  const Logout = () => {
    updateUser({});
    localStorage.clear();
    changeLogInStatus(false);
    router.push("/login");
    toast.info("Logged out!", toastConfig);
  };

  return (
    <div
      className={`flex items-center justify-between w-32 cursor-pointer bg-inherit relative ${
        isMobileView ? "flex-col space-y-4" : ""
      } `}
    >
      {isLoggedIn ? (
        <>
          <div className={`flex items-center ${isMobileView ? "" : "mr-3"}`}>
            <span
              className={`select-none opacity-80 hover:opacity-100 mb-1`}
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
            className={`absolute top-[25px] bg-c right-0 mt-2 w-[170px] rounded-md z-10 ${
              !showDropdown ? "hidden" : ""
            }`}
          >
            {/* <Link href={`/user/${user._id}`}>
              <a
                className="block px-4 py-2    text-sm opacity-80    "
                role="menuitem"
              >
                My Projects
              </a>
            </Link> */}
            <Link href={`/user/${user._id}`}>
              <a
                className="flex items-center gap-2 px-4 py-2  text-sm"
                role="menuitem"
              >
                <AiOutlineUser /> <span>Profile</span>
              </a>
            </Link>
            <Link href={`/projects/new`}>
              <a
                className="flex items-center gap-2 px-4 py-2    text-sm      "
                role="menuitem"
              >
                <BsBookmarkPlus></BsBookmarkPlus> <span> Add Project</span>
              </a>
            </Link>
            {/* <Link href={`/notification`}>
              <a
                className="flex items-center gap-2 px-4 py-2    text-sm      "
                role="menuitem"
              >
                <IoMdNotificationsOutline></IoMdNotificationsOutline>{" "}
                <span> Notifications</span>
              </a>
            </Link> */}
            <a
              className="flex items-center gap-2 px-4 py-2    text-sm       "
              role="menuitem"
              onClick={Logout}
            >
              <FiLogOut></FiLogOut> <span>Logout</span>
            </a>
          </div>
          {isMobileView ? (
            <></>
          ) : (
            <>
              <Link href={`/notification`}>
                <div
                  onClick={() => setIsNewNotification(false)}
                  className={`${
                    isNewNotification && " text-main-purple animate-bounce"
                  }`}
                >
                  {isNewNotification ? (
                    <MdOutlineNotificationsActive
                      size={22}
                    ></MdOutlineNotificationsActive>
                  ) : (
                    <IoMdNotificationsOutline
                      size={22}
                    ></IoMdNotificationsOutline>
                  )}
                </div>
              </Link>
            </>
          )}
        </>
      ) : (
        <div className="flex items-center">
          <Link href="/login">
            <a className="opacity-80 hover:opacity-100 cursor-pointer duration-200">
              {/* Login */}
              Get Started
            </a>
          </Link>
          {/* <Button href="/login">
            <h1 className="opacity-80 hover:opacity-100 cursor-pointer duration-200">
              Login
            </h1>
          </Button> */}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
