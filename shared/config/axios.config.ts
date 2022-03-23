import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3001/api/";

export default axios.create({
  baseURL,
  timeout: 5000,
  headers: {},
});
