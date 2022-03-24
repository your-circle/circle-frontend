import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { verifyToken } from "../shared/services/auth.services";

const useAuth = () => {
  const router = useRouter();
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const authToken = localStorage.getItem("jwtToken");
        if (!authToken) {
          router.push("/login");
          return;
        }
        const isAuthenticated = await verifyToken(authToken);
        if (isAuthenticated) {
          return;
        } else {
          router.push("/login");
        }
      } catch (err: any) {
        console.log("err", err.message);
        localStorage.removeItem("jwtToken");
        if (err?.response?.status == 401) {
          toast.error("Invalid user token, please login again!");
        } else {
          toast.error(err?.message || "something went wrong");
        }
        router.push("/login");
      }
    };
    verifyAuth();
  }, []);

  return;
};

export default useAuth;
