import { API, APIWithToken } from "../config/axios.config";

export const getNotification = async (payload: any) => {
  const token = localStorage.getItem("jwtToken") || "";

  try {
    const res = await APIWithToken.post("/v1/notification/all", payload);
    if (res.status !== 200) {
      throw Error(res?.data?.message || "Can't get the Notification");
    }
    return res.data;
  } catch (err: any) {
    console.log("error", err.message);
    throw Error(err.response?.data?.message || "Can't get the Notification");
  }
};



export const getNotificationStatus = async () => {

  try {
    const res = await APIWithToken.post("/v1/notification/status");
    if (res.status !== 200) {
      throw Error(res?.data?.message || "Can't get the Notification");
    }
    return res.data;
  } catch (err: any) {
    throw Error(err.response?.data?.message || "Can't get the Notification");
  }
};
