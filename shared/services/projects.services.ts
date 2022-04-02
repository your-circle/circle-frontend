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

export const getAllProjects = async () => {
  try {
    const res = await axios.get(`v1/project/all`);
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

interface newProjectPayload {
  title: string;
  description: string;
  tech: string[];
  open_to: string[];
}
export const newProject = async (payload: newProjectPayload) => {
  const token = localStorage.getItem("jwtToken") || "";
  console.log("user", token);
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
