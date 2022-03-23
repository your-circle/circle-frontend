import axios from "../config/axios.config";

interface signupPayload {
  name: string;
  email: string;
  password: string;
}

export const signup = async (payload: signupPayload) => {
  try {
    const res = await axios.post("auth/signup", payload);
    if (res.status != 200) {
      throw Error(res?.data?.message || "something went wrong");
    }
    return res.data;
  } catch (err: any) {
    throw Error(err?.response?.data?.message || "something went wrong");
  }
};
interface loginPayload {
  email: string;
  password: string;
}

export const login = async (payload: loginPayload) => {
  try {
    const res = await axios.post("auth/login", payload);
    if (res.status != 200) {
      throw Error(res?.data?.message || "something went wrong");
    }
    return res.data;
  } catch (err: any) {
    throw Error(err?.response?.data?.message || "something went wrong");
  }
};
