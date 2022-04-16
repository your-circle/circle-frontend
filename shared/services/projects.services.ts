import Axios from "axios";
import axios from "../config/axios.config";

export const getUserProjects = async (id: any, payload: any) => {
  const token = window.localStorage.getItem("jwtToken") || "";
  console.log(token);
  try {
    const res = await axios.post(`/v1/project/my-projects/${id}`, payload, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log("res", res);

    if (res.status != 200) {
      throw Error(res?.data?.message || "something went wrong");
    }
    return res.data;
  } catch (err: any) {
    console.log("error", err.message);

    // throw Error(err?.response?.data?.message || "something went wrong");
  }
};

export const getAllProjects = async (payload: any) => {
  try {
    const res = await axios.post(`v1/project/all`, payload);
    if (res.status != 200) {
      throw Error(res?.data?.message || "something went wrong");
    }
    return res.data;
  } catch (err: any) {
    console.error(err);

    // throw Error(err?.response?.data?.message || "something went wrong");
  }
};

export const getProject = async (id: string) => {
  try {
    const res = await axios.get(`v1/project/${id}`);
    if (res.status != 200) {
      throw Error(res?.data?.message || "something went wrong");
    }
    return res.data;
  } catch (err: any) {
    console.error(err);
  }
};

export const joinProject = async (id: string) => {
  const token = localStorage.getItem("jwtToken") || "";
  try {
    const res = await axios.post(
      `v1/project/join-request/${id}`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status != 200) {
      throw Error(res?.data?.message || "something went wrong");
    }
    return res.data;
  } catch (err: any) {
    console.error(err);
  }
};

export const addProjectMember = async (id: string, userId: string) => {
  const token = localStorage.getItem("jwtToken") || "";
  try {
    const res = await axios.post(
      `v1/project/add-member/${id}`,
      { user_id: userId },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status != 200) {
      throw Error(res?.data?.message || "something went wrong");
    }
    return res.data;
  } catch (err: any) {
    console.error(err);
  }
};

interface newProjectPayload {
  title: string;
  description: string;
  tech: string[];
  need: string[];
}
export const newProject = async (payload: newProjectPayload) => {
  const token = localStorage.getItem("jwtToken") || "";
  try {
    const res = await axios.post("/v1/project/add-project", payload, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err: any) {
    throw Error(err?.response?.data?.message || "something went wrong");
  }
};

export const editProject = async (id: string, payload: any) => {
  const token = localStorage.getItem("jwtToken") || "";
  console.log(payload);
  try {
    const res = await axios.put("v1/project/update/" + id, payload, {
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
