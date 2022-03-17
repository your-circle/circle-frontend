import type { NextPage } from "next";
import Link from "next/link";
import { useState, useContext } from "react";
import { signup } from "../api/auth";
import Input from "../shared/components/Input";
import { userContext } from "../providers/userProvider";
import { toast } from "react-toastify";
import { validateEmail } from "../shared/helpers";
import { toastConfig } from "../shared/constants";

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
    try {
      const res = await signup(input);
      console.log("signup", res.data);
      updateUser(res.data);
      changeLogInStatus();
    } catch (err: any) {
      console.error(err?.message || "something went wrong, try again!");
      alert(err.message);
    }
  };

  const onInputChange = (key: string, value: string) => {
    setInput({
      ...input,
      [key]: value,
    });
  };

  return (
    <>
      <div className="bg-main-bg text-white min-h-screen min-w-full flex flex-col items-center justify-center pt-[58px] mt-[-60px]">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center gap-4"
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
            className="rounded-md bg-main-purple px-4 py-2"
            onClick={handleSubmit}
          >
            Sign up
          </button>
          <span>
            Already have an account?
            <Link href="/login">
              <a className="text-main-purple">Log in</a>
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
