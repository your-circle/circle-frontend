import { NextPage } from "next";
import Link from "next/link";

const _404: NextPage = () => {
  return (
    <>
      <div className="flex items-center min-h-[70vh] justify-center">
        <div className="flex flex-col text-center items-center">
          <h1 className="text-3xl text-main-gradient">404</h1>
          <h2 className="text-lg text-main-purple">Page Not Found</h2>
          <h3 className="text-slate-300">You seem to have lost your way</h3>
          <h3 className="text-slate-300">Navigate to:</h3>
          <div className="flex justify-around w-1/2">
            <Link href="/projects">
              <a className="px-2 opacity-80 hover:opacity-100 cursor-pointer hover:text-main-gradient duration-200">
                Projects
              </a>
            </Link>
            <Link href="/projects">
              <a className="px-2 opacity-80 hover:opacity-100 cursor-pointer hover:text-main-gradient duration-200">
                Projects
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default _404;
