import axios from "./axios";

interface newProjectPayload {
  title: string;
  description: string;
  tech: string[];
  open_to: string[];
}
export const newPost = async (payload: newProjectPayload) => {
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

// get all post
// get post by id
