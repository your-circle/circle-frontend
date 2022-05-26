import type { NextPage } from "next";
import Link from "next/link";
import { useState, useContext } from "react";
import { signup } from "../shared/services/auth.services";
import Input from "../shared/components/Input";
import { userContext } from "../providers/userProvider";
import { toast } from "react-toastify";
import { validateEmail, validatePassword } from "../shared/helpers";
import { toastConfig } from "../shared/config/constants";
import Card from "../shared/components/Card";
import { useRouter } from "next/router";
import { themeContext } from "../providers/themeProvider";

const Login: NextPage = () => {
  const router = useRouter();
  const { theme } = useContext(themeContext);
  type inputType = {
    name: string;
    email: string;
    password: string;
  };
  const [input, setInput] = useState<inputType>({
    name: "",
    email: "",
    password: "",
  });
  const { isLoggedIn, updateUser, changeLogInStatus } = useContext(userContext);

  if (isLoggedIn) {
    router.push("projects");
  }

  const handleSubmit = async () => {
    // validate the input
    if (input.name.length < 3 || input.name.length > 25) {
      toast("Name must be between 3 and 25 characters", toastConfig);
      return;
    }
    if (!validateEmail(input.email)) {
      toast("Enter valid email", toastConfig);
      return;
    }

    if (!validatePassword(input.password)) {
      toast(
        "Password must be between at least 8 characters, at least one letter and one number",
        toastConfig
      );
      return;
    }

    // login
    const signupApiCall = async () => {
      const res = await signup(input);
      updateUser(res.data);
      changeLogInStatus(true);
      localStorage.setItem("jwtToken", res.data.token);
      router.push("/profile/edit");
    };
    toast.promise(
      signupApiCall,
      {
        pending: " Signing in ....",
        error: "Oops! Couldn't Sign in",
        success: "Signed In !",
      },
      toastConfig
    );
  };

  const onInputChange = (key: string, value: string) => {
    setInput({
      ...input,
      [key]: value,
    });
  };

  return (
    <div
      className={`${
        theme === "light" ? "bg-light-theme-bg text-[#202020]" : "bg-main-bg"
      } flex flex-col min-w-full h-[calc(100vh-65px)] items-center justify-center overflow-auto`}
    >
      <div
        className={`${
          theme === "light"
            ? "bg-light-theme-bg text-[#202020]"
            : "bg-main-bg text-white"
        } h-fit`}
      >
        <Card scale={false}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-center justify-around gap-2 py-6 px-3 h-[25rem]"
            autoComplete="chrome-off"
          >
            <span className="text-lg">Create a Circle account</span>
            <div className="flex flex-col justify-between h-[10rem] gap-4">
              <Input
                auth
                icon={
                  theme === "light"
                    ? "/images/user-icon-light.svg"
                    : "/images/user-icon.svg"
                }
                name="name"
                type="text"
                key="name"
                value={input.name}
                onChange={onInputChange}
              />
              <Input
                auth
                icon="/images/email-icon.svg"
                name="email"
                type="text"
                key="email"
                value={input.email}
                onChange={onInputChange}
              />
              <Input
                auth
                icon={
                  theme === "light"
                    ? "/images/password-icon-light.svg"
                    : "/images/password-icon.svg"
                }
                name="password"
                type="password"
                key="password"
                value={input.password}
                onChange={onInputChange}
              />
            </div>
            <button
              className="w-full bg-blue-500 px-4 py-2.5 rounded-sm "
              onClick={handleSubmit}
            >
              Sign up
            </button>
            <span>
              Already have an account?
              <Link href="/login">
                <a className="text-main-purple ml-2"> Log in</a>
              </Link>
            </span>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
