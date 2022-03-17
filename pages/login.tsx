import type { NextPage } from "next";
import Link from "next/link";
import { useContext, useState } from "react";
import { login } from "../api/auth";
import { userContext } from "../providers/userProvider";
import Input from "../shared/components/Input";

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
      alert("enter valid email");
      return;
    }
    if (input.password.length < 3 || input.password.length > 25) {
      alert("password must be between 3 and 25 characters");
      return;
    }

    // login
    try {
      const res = await login(input);
      console.log("login", res.data);
      updateUser(res.data);
      changeLogInStatus();
    } catch (err: any) {
      console.error(err?.message || "something went wrong, try again!");
      alert(err.message);
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
      <div className="bg-main-bg text-white min-h-screen min-w-full flex flex-col items-center justify-center pt-[58px] mt-[-60px]">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center gap-4"
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
            className="rounded-md bg-main-purple px-4 py-2"
            onClick={handleSubmit}
          >
            Log in
          </button>
          <span>
            New to Circle?{" "}
            <Link href="/signup">
              <a className="text-main-purple">Sign up</a>
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
