import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { userContext } from "../providers/userProvider";
import { verifyToken } from "../shared/services/auth.services";

const useAuth = () => {
  const router = useRouter();
  const { updateUser, changeLogInStatus } = useContext(userContext);
  useEffect(() => {

    const verifyAuth = async () => {
      try {
        const authToken = localStorage.getItem("jwtToken") || "";
        if (!authToken) {
          ChangeRoute()
          return;
        }
        const isAuthenticated = await verifyToken(authToken);
        if (isAuthenticated) {
          return;
        } else {
          Logout();
          router.push("/");
        }
      } catch (err: any) {
        console.log("err", err.message);
        Logout();
        if (err?.response?.status == 401) {
          toast.error("Invalid user token, please login again!");
        } else {
          toast.error(err?.message || "something went wrong");
        }
        router.push("/");
      }
    };
    verifyAuth();
  }, []);

  const Logout = () => {
    console.log("clearing storage");
    updateUser({});
    changeLogInStatus(false);
    localStorage.clear();
  };
  const ChangeRoute = () => {

    if (!(window.location.href.includes('login') || window.location.href.includes('signup') || window.location.href.split('/').length == 3 || window.location.href.split('/')[3] == '')) {
      window.location.href = '/'
    }
  };

  return;
};

export default useAuth;
