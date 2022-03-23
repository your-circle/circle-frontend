import type { NextPage } from "next";
import Link from "next/link";
import { useContext, useState } from "react";
import { login } from "../api/auth";
import { userContext } from "../providers/userProvider";
import Input from "../shared/components/Input";
import { toast } from "react-toastify";
import { toastConfig } from "../shared/constants";
import Card from "../shared/components/Card";

const Login: NextPage = () => {
  type inputType = {
    email: string;
    password: string;
  };
  const [input, setInput] = useState<inputType>({
    email: "",
    password: "",
  });
  const { updateUser, changeLogInStatus } = useContext(userContext);

  const handleSubmit = async () => {
    // validate the input
    if (!validateEmail(input.email)) {
      toast("Enter valid email", toastConfig);
      return;
    }
    if (input.password.length < 3 || input.password.length > 25) {
      toast("Password must be between 3 and 25 characters", toastConfig);
      return;
    }

    // login
    try {
      const loginApiCall = async () => {
        const res = await login(input);
        console.log("login", res.data);
        updateUser(res.data);
        changeLogInStatus();
      };
      toast.promise(
        loginApiCall,
        {
          pending: "Logging in ....",
          error: "Oops! Couldn't log in",
          success: "Logged In !",
        },
        toastConfig
      );
    } catch (err: any) {
      toast.error("Oops! Something Went Wrong", toastConfig);
      console.error(err?.message || "something went wrong, try again!");
    }
  };

  const validateEmail = (email: string) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const onInputChange = (key: string, value: string) => {
    setInput({
      ...input,
      [key]: value,
    });
  };

  return (
    <>
      <div className="bg-main-bg text-white mt-[20vh] min-w-full  flex flex-col items-center justify-center">
        <Card>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-center gap-4 py-6 px-3"
          >
            <span className="text-lg">Log in to your Circle account</span>
            <Input
              icon="/images/email-icon.svg"
              name="email"
              type="text"
              key="email"
              onChange={onInputChange}
            />
            <Input
              icon="/images/password-icon.svg"
              name="password"
              type="password"
              key="password"
              onChange={onInputChange}
            />
            <button
              className="min-w-[280px] bg-main-purple px-4 py-2 rounded-full "
              onClick={handleSubmit}
            >
              Log in
            </button>
            <span>
              New to Circle?
              <Link href="/signup">
                <a className="text-main-purple"> Sign up</a>
              </Link>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Login;
