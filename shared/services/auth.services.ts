import axios from "../config/axios.config";

export const verifyToken = async (token: string) => {
  try {
    const res = await axios.get("v1/auth/verifyToken", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (res.status != 200) {
      return false;
    }
    return true;
  } catch (err: any) {
    return false;
  }
};

interface signupPayload {
  name: string;
  email: string;
  password: string;
}

export const signup = async (payload: signupPayload) => {
  try {
    const res = await axios.post("v1/auth/signup", payload);
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
    const res = await axios.post("v1/auth/login", payload);
    if (res.status != 200) {
      throw Error(res?.data?.message || "something went wrong");
    }
    return res.data;
  } catch (err: any) {
    throw Error(err?.response?.data?.message || "something went wrong");
  }
};
