import { useState } from "react";
import Image from "next/image";
const Sidebar: React.FC = () => {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  return (
    <>
      <div className="fixed left-0 h-full z-20">
        <>
          <button
            className={`${sidebarStatus ? "hidden" : "flex"} m-1`}
            onClick={() => setSidebarStatus(!sidebarStatus)}
          >
            <Image
              src="/images/sidebar-open-icon.svg"
              layout="fixed"
              height={30}
              width={30}
            />
          </button>
          <div
            className={`${
              sidebarStatus ? "flex" : "hidden"
            } justify-center items-start pt-12 w-64 border-gray-border bg-main-bg border border-l-0 border-t-0 border-b-0  h-full`}
          >
            <button
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setSidebarStatus(!sidebarStatus)}
            >
              <Image
                src="/images/sidebar-close-icon.svg"
                layout="fixed"
                height={30}
                width={30}
              />
            </button>
            <div className="flex flex-col">
              <div className="space-y-2 flex flex-col">
                <button className="px-6 text-center border border-gray-border rounded-md p-2 cursor-pointer hover:bg-main-purple">
                  Add a Project
                </button>
                <button className="px-6 text-center border border-gray-border rounded-md p-2 cursor-pointer hover:bg-main-purple">
                  My Projects
                </button>
              </div>
              <div className="">
                <div
                  className="flex items-center justify-around px-6 p-2 cursor-pointer"
                  onClick={() => setDropdown(!dropdown)}
                >
                  <h2>Filters</h2>

                  {/* <Image
                    src={`${
                      dropdown ? "/images/down-icon.svg" : "/images/up-icon.svg"
                    }`}
                    layout="fixed"
                    height={30}
                    width={30}
                  /> */}
                </div>
                <div className="">
                  <h3>Looking for</h3>
                  <input
                    type="checkbox"
                    name="Developers"
                    id="Developers"
                    className="bg-slate-400"
                  />
                  <label htmlFor="Developers"></label>
                </div>
                <h3></h3>
                <h3></h3>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default Sidebar;
