import type { NextPage } from "next";
import useAuth from "../hooks/useAuth";

const People: NextPage = () => {
  useAuth();
  return (
    <>
      <div className="bg-main-bg  text-white min-h-screen min-w-full">
        <h1 className="">Profile</h1>
      </div>
    </>
  );
};

export default People;
