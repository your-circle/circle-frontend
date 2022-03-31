import type { NextPage } from "next";
import Image from "next/image";
import Loading from "../shared/components/Loading/Loading";

const Home: NextPage = () => {
  return (
    <div className="flex items-center h-[calc(100vh-60px)]">
      <div className="home-text text-5xl basis-3/6 px-6 py-2 text-center text-transparent bg-clip-text bg-gradient-to-br from-[#B679D2] via-[#8FD89A] to-[#E8735C]">
        Build your teams for projects and hackathons
      </div>
      <div className="w-full basis-3/6 flex justify-center">
        <Image
          src="/images/home-icon.jpg"
          alt="logout"
          width={450}
          height={250}
        />
      </div>
    </div>
  );
};

export default Home;
