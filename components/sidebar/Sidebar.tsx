import { useState } from "react";
import Image from "next/image";
const Sidebar: React.FC = () => {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [dropdownSkills, setDropdownSkills] = useState(false);
  const [dropdownNeeds, setDropdownNeeds] = useState(false);
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
                <div className="flex items-center justify-around px-6 pt-5 cursor-pointer">
                  <h2>Filters</h2>
                </div>
                <div className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <button
                      type="button"
                      className="text-white w-full flex items-center justify-between text-sm hover:text-main-purple"
                      onClick={() => setDropdownSkills(!dropdownSkills)}
                    >
                      <span className="font-medium"> Skills </span>
                      <span className="ml-6 flex items-center ">
                        {dropdownSkills ? (
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        )}
                      </span>
                    </button>
                  </h3>
                  <div className="">
                    {dropdownSkills ? (
                      <div className="pt-6" id="filter-section-0">
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <input
                              id="filter-color-0"
                              name="skills"
                              value="white"
                              type="checkbox"
                              className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-color-0"
                              className="ml-3 text-sm"
                            >
                              Frontend
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-color-0"
                              name="skills"
                              value="white"
                              type="checkbox"
                              className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-color-0"
                              className="ml-3 text-sm"
                            >
                              Backend
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-color-0"
                              name="skills"
                              value="white"
                              type="checkbox"
                              className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-color-0"
                              className="ml-3 text-sm"
                            >
                              Blockchain
                            </label>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <button
                      type="button"
                      className="text-white w-full flex items-center justify-between text-sm hover:text-main-purple"
                      onClick={() => setDropdownNeeds(!dropdownNeeds)}
                    >
                      <span className="font-medium"> Looking For </span>
                      <span className="ml-6 flex items-center ">
                        {dropdownNeeds ? (
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        )}
                      </span>
                    </button>
                  </h3>
                  <div className="">
                    {dropdownNeeds ? (
                      <div className="pt-6" id="filter-section-0">
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <input
                              id="filter-color-0"
                              name="skills"
                              value="white"
                              type="checkbox"
                              className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-color-0"
                              className="ml-3 text-sm"
                            >
                              Developers
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-color-0"
                              name="skills"
                              value="white"
                              type="checkbox"
                              className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-color-0"
                              className="ml-3 text-sm"
                            >
                              Mentors
                            </label>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default Sidebar;
