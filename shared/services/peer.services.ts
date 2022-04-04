import axios from "axios";

export const getAllPeers = async () => {
  try {
    const res = await axios.get(`v1/user/all`);
    if (res.status != 200) {
      throw Error(res?.data?.message || "something went wrong");
    }
    return res.data;
  } catch (err: any) {
    throw Error(err?.response?.data?.message || "something went wrong");
  }
};
