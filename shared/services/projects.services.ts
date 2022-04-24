import { API, APIWithToken } from "../config/axios.config";

export const getUserProjects = async (id: any, payload: any) => {
  try {
    const res = await APIWithToken.post(
      `/v1/project/my-projects/${id}`,
      payload
    );

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
    const res = await APIWithToken.post(`v1/project/all`, payload);
    if (res.status != 200) {
      throw Error(res?.data?.message || "something went wrong");
    }
    return res.data;
  } catch (err: any) {
    console.error(err);

    // throw Error(err?.response?.data?.message || "something went wrong");
  }
};

export const getProject = async (id: any) => {
  try {
    const res = await API.get(`v1/project/${id}`);
    if (res.status != 200) {
      throw Error(res?.data?.message || "something went wrong");
    }
    return res.data;
  } catch (err: any) {
    console.log(err);
  }
};

export const joinProject = async (id: string) => {
  try {
    const res = await APIWithToken.post(`v1/project/join-request/${id}`, {});
    if (res.status != 200) {
      throw Error(res?.data?.message || "something went wrong");
    }
    return res.data;
  } catch (err: any) {
    console.error(err);
  }
};

export const addProjectMember = async (id: string, userId: string) => {
  try {
    const res = await APIWithToken.post(`v1/project/add-member/${id}`, {
      user_id: userId,
    });
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
    const res = await APIWithToken.post("/v1/project/add-project", payload);
    return res.data;
  } catch (err: any) {
    throw Error(err?.response?.data?.message || "something went wrong");
  }
};

export const editProject = async (id: string, payload: any) => {
  try {
    const res = await APIWithToken.put("v1/project/update/" + id, payload);
    if (res.status != 200) {
      throw Error(res?.data?.message || "something went wrong");
    }
    return res;
  } catch (err: any) {
    throw Error(err?.response?.data?.message || "something went wrong");
  }
};

export const deleteProject = async (id: string) => {
  try {
    const res = await APIWithToken.delete(`v1/project/delete/${id}`);
    if (res.status !== 200) {
      throw Error(res?.data?.message || "something went wrong");
    }
    return res.data;
  } catch (err: any) {
    throw Error(err?.response?.data?.message || "something went wrong");
  }
};
