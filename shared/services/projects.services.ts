import axios from "../config/axios.config";

export const getUserProjects = async (id: any) => {
  try {
    const res = await axios.get(`v1/projects/${id}`);
    if (res.status != 200) {
      throw Error(res?.data?.message || "something went wrong");
    }
    return res.data;
  } catch (err: any) {
    throw Error(err?.response?.data?.message || "something went wrong");
  }
};
