import type { NextPage } from "next";
import Link from "next/link";
import { useState, useContext } from "react";
import { signup } from "../api/auth";
import Input from "../shared/components/Input";
import { userContext } from "../providers/userProvider";
import { toast } from "react-toastify";
import { validateEmail } from "../shared/helpers";
import { toastConfig } from "../shared/constants";
import Card from "../shared/components/Card";

const Login: NextPage = () => {
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
  const { updateUser, changeLogInStatus } = useContext(userContext);

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
    if (input.password.length < 3 || input.password.length > 25) {
      toast("Password must be between 3 and 25 characters", toastConfig);
      return;
    }

    // login
    const signupApiCall = async () => {
      const res = await signup(input);
      console.log("signup", res.data);
      updateUser(res.data);
      changeLogInStatus();
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
    <>
      <div className="bg-main-bg text-white mt-[20vh] min-w-full  flex flex-col items-center justify-center">
        <Card>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-center gap-4 py-6 px-3"
          >
            <span className="text-lg">Create a Circle account</span>
            <Input
              icon="/images/user-icon.svg"
              name="name"
              type="text"
              key="name"
              onChange={onInputChange}
            />
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
              Sign up
            </button>
            <span>
              Already have an account?
              <Link href="/login">
                <a className="text-main-purple"> Log in</a>
              </Link>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Login;
