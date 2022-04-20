import axios from "axios";
import { BackendURL } from "./constants";

export const baseURL = BackendURL;

const API = axios.create({
  baseURL,
  timeout: 10000,
  headers: {},
});

// const token: string = localStorage.getItem('jwtToken') || "";


const APIWithToken = axios.create({
  baseURL,
  timeout: 10000,
});

APIWithToken.interceptors.request.use((req: any) => {
  if (window.localStorage?.getItem("jwtToken")) {
    req.headers.authorization = `Bearer ${window.localStorage?.getItem("jwtToken") || ""}`;
  }
  return req;
});


export { API, APIWithToken }