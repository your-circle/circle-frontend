import axios from "../config/axios.config";

export const getNotification = async (payload: any) => {
  const token = localStorage.getItem("jwtToken") || "";

  try {
    const res = await axios.post("/v1/notification/all", payload, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) {
      throw Error(res?.data?.message || "Can't get the Notification");
    }
    console.log("notification", res.data);
    return res.data;
  } catch (err: any) {
    console.log("error", err.message);
    throw Error(err.response?.data?.message || "Can't get the Notification");
  }
};
