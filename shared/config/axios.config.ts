import axios from "axios";
import { BackendURL } from "./constants";

export const baseURL = BackendURL;

export default axios.create({
  baseURL,
  timeout: 5000,
  headers: {},
});
