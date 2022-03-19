import axios from "axios";
import config from "../config";

const baseURL = config.BackendURL;

export default axios.create({
  baseURL,
  timeout: 5000,
  headers: {},
});
