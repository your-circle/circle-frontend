import axios from "../config/axios.config";

export const getUser = async (id: any) => {
  try {
    const res = await axios.get(`v1/user/${id}`);
    console.log("res", res.data);

    if (res.status != 200) {
      throw Error(res?.data?.message || "something went wrong");
    }
    return res.data;
  } catch (err: any) {
    throw Error(err?.response?.data?.message || "something went wrong");
  }
};

export const getAllUsers = async (payload: any) => {
  try {
    const res = await axios.post(`v1/user/all`, payload);
    if (res.status != 200) {
      throw Error(res?.data?.message || "something went wrong");
    }
    return res.data;
  } catch (err: any) {
    throw Error(err?.response?.data?.message || "something went wrong");
  }
};

export const editUser = async (payload: any) => {
  const token = localStorage.getItem("jwtToken") || "";
  try {
    const res = await axios.put("v1/user/update", payload, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (res.status != 200) {
      throw Error(res?.data?.message || "something went wrong");
    }
    return res.data;
  } catch (err: any) {
    throw Error(err?.response?.data?.message || "something went wrong");
  }
};
