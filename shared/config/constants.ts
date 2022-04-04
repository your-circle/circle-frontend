import { ToastOptions } from "react-toastify/dist/types";

export const toastConfig: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
  progress: undefined,
};

export const BackendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const skillEnum = [
  "Frontend",
  "Backend",
  "Fullstack",
  "UI/UX",
  "ML",
  "AppDev",
  "Blockchain",
  "Hardware",
  "Cybersecurity",
];
