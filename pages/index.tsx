import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { userContext } from "../providers/userProvider";
import Loading from "../shared/components/Loading/Loading";
import Lottie from "lottie-react";
import teamworkAnimation from "../public/lottie-files/teamwork.json";

const Home: NextPage = () => {
  const router = useRouter();
  const { isLoggedIn } = useContext(userContext);

  if (isLoggedIn) {
    router.push("projects");
  }

  return (
    <div className="flex items-start flex-col md:items-center md:flex-row md:justify-between h-[calc(100vh-74px)]">
      <div className="flex flex-col ml-4 w-fit md:w-1/2">
        <div className="flex flex-col items-start home-text basis-3/6 px-6 py-2 text-center text-transparent bg-clip-text">
          <div className="flex gap-[10px] md:gap-0 md:flex-col md:items-start">
            <span className="text-4xl md:text-4xl font-semibold lg:text-6xl text-white"></span>
            <span className="text-4xl md:text-4xl font-bold lg:text-6xl text-blue-500">
              <span className="text-white">Build</span> Awesome Team
            </span>
          </div>
          <span className="text-3xl md:text-3xl lg:text-5xl text-white">
            For Your Next Project
          </span>
        </div>
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-500 text-xl px-6 py-2 my-4 ml-6 rounded-md w-fit"
        >
          Get Started
        </button>
      </div>
      <div className="flex w-full md:w-1/2 h-fit">
        <div className="w-[700px] md:w-[500px]">
          <Lottie animationData={teamworkAnimation} loop />
        </div>
      </div>
    </div>
  );
};

export default Home;
