import type { NextPage } from "next";
import Link from "next/link";
import { useContext, useState } from "react";
import { login } from "../shared/services/auth.services";
import { userContext } from "../providers/userProvider";
import Input from "../shared/components/Input";
import { toast } from "react-toastify";
import { toastConfig } from "../shared/config/constants";
import Card from "../shared/components/Card";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const router = useRouter();
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
        changeLogInStatus(true);
        localStorage.setItem("jwtToken", res.data.token);
        router.push("/projects");
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
        <Card scale={false}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-center justify-around gap-4 py-6 px-3 h-[25rem]"
          >
            <span className="text-lg">Log in to your Circle account</span>
            <div className="flex flex-col justify-between h-[6rem]">
              <Input
                icon="/images/email-icon.svg"
                name="Email"
                type="text"
                key="email"
                onChange={onInputChange}
              />
              <Input
                icon="/images/password-icon.svg"
                name="Password"
                type="password"
                key="password"
                onChange={onInputChange}
              />
            </div>

            <button
              className="min-w-[280px] bg-main-purple px-4 py-2.5 rounded-sm "
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
