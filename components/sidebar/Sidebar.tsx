import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { userContext } from "../../providers/userProvider";
import { openToArray } from "../../shared/schemas/peerDetails.schema";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import {
  needsArray,
  projectTypeArray,
} from "../../shared/schemas/projectDetails.schema";

type Props = {
  type: string;
  filters: object;
  setFilters: any;
  setProjects: any;
  setRange: any;
  setHasMoreProject: any;
};

const Sidebar: React.FC<Props> = (props: Props) => {
  const { filters, setFilters, setProjects, setRange, setHasMoreProject } =
    props;
  const [localFilters, setLocalFilters] = useState(filters);
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [dropdownSkills, setDropdownSkills] = useState(false);
  const [dropdownNeeds, setDropdownNeeds] = useState(false);
  const { user, isLoggedIn } = useContext(userContext);

  const updateLocalFilters = (type: string, key: string, value: any) => {
    const updatedLocalFilters = { ...localFilters };
    const isPresent = updatedLocalFilters[type].includes(key);
    if (value && !isPresent) {
      updatedLocalFilters[type].push(key);
    } else if (!value && isPresent) {
      const index = updatedLocalFilters[type].indexOf(key);
      updatedLocalFilters[type].splice(index, 1);
    }
    setLocalFilters(updatedLocalFilters);
  };

  const applyFilters = async () => {
    setProjects([]);
    setRange({ from: 1, to: 9 });
    setHasMoreProject(true);
    setFilters(localFilters);
  };

  return (
    <>
      <div className="fixed left-0 h-full z-20 scrollbar overflow-y-scroll">
        <>
          <button
            className={`${sidebarStatus ? "hidden" : "flex"} m-1`}
            onClick={() => setSidebarStatus(!sidebarStatus)}
          >
            <IoIosArrowForward size={25}></IoIosArrowForward>
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
              <IoIosArrowBack size={25}></IoIosArrowBack>
            </button>

            <div className="flex flex-col">
              <div className="flex w-full flex-col items-center">
                <div className="filters pb-16 w-full px-[50px] bg-main-bg">
                  <div className="flex items-center justify-around px-6 pt-5 cursor-pointer">
                    <h2>Filters</h2>
                  </div>
                  {/* projects: tech, need */}
                  {/* peers: skills, open_to */}
                  {props.type === "PROJECTS" && (
                    <>
                      <div className=" py-6">
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
                                    fillRule="evenodd"
                                    d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                    clipRule="evenodd"
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
                                    fillRule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clipRule="evenodd"
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
                                {projectTypeArray.map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={item}
                                      name="skills"
                                      value="white"
                                      checked={localFilters.tech.includes(item)}
                                      onChange={(e) =>
                                        updateLocalFilters(
                                          "tech",
                                          item,
                                          e.target.checked
                                        )
                                      }
                                      type="checkbox"
                                      className="opacity-0 absolute h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                    />

                                    <DivCheckbox />

                                    <label
                                      htmlFor={item}
                                      className="ml-3 text-sm cursor-pointer"
                                    >
                                      {item}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className=" py-6">
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
                                    fillRule="evenodd"
                                    d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                    clipRule="evenodd"
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
                                    fillRule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clipRule="evenodd"
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
                                {needsArray.map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={item}
                                      name="skills"
                                      value="white"
                                      type="checkbox"
                                      checked={localFilters.need.includes(item)}
                                      onChange={(e) =>
                                        updateLocalFilters(
                                          "need",
                                          item,
                                          e.target.checked
                                        )
                                      }
                                      className="opacity-0 absolute h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                    />
                                    <DivCheckbox></DivCheckbox>
                                    <label
                                      htmlFor={item}
                                      className="ml-3 text-sm cursor-pointer"
                                    >
                                      {item}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </>
                  )}
                  {props.type === "PEERS" && (
                    <>
                      <div className=" py-6">
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
                                    fillRule="evenodd"
                                    d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                    clipRule="evenodd"
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
                                    fillRule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clipRule="evenodd"
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
                                {projectTypeArray.map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={item}
                                      name="skills"
                                      value="white"
                                      type="checkbox"
                                      checked={localFilters.skills.includes(
                                        item
                                      )}
                                      onChange={(e) =>
                                        updateLocalFilters(
                                          "skills",
                                          item,
                                          e.target.checked
                                        )
                                      }
                                      className="opacity-0 absolute h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                    />
                                    <DivCheckbox></DivCheckbox>
                                    <label
                                      htmlFor={item}
                                      className="ml-3 text-sm cursor-pointer"
                                    >
                                      {item}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className=" py-6">
                        <h3 className="-my-3 flow-root">
                          <button
                            type="button"
                            className="text-white w-full flex items-center justify-between text-sm hover:text-main-purple"
                            onClick={() => setDropdownNeeds(!dropdownNeeds)}
                          >
                            <span className="font-medium"> open to </span>
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
                                    fillRule="evenodd"
                                    d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                    clipRule="evenodd"
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
                                    fillRule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clipRule="evenodd"
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
                                {openToArray.map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={item}
                                      name="skills"
                                      value="white"
                                      type="checkbox"
                                      checked={localFilters.open_to.includes(
                                        item
                                      )}
                                      onChange={(e) =>
                                        updateLocalFilters(
                                          "open_to",
                                          item,
                                          e.target.checked
                                        )
                                      }
                                      className="opacity-0 absolute h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                    />
                                    <DivCheckbox></DivCheckbox>
                                    <label
                                      htmlFor={item}
                                      className="ml-3 text-sm cursor-pointer"
                                    >
                                      {item}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  <button
                    onClick={applyFilters}
                    className="px-6 my-4 text-center border border-gray-border rounded-md p-2 cursor-pointer bg-main-purple"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>

              {isLoggedIn && (
                <div className="space-y-2 flex flex-col items-center">
                  <button className="px-6 w-[170px] text-center border border-gray-border rounded-md p-2 cursor-pointer hover:bg-main-purple">
                    <Link href={`/projects/new`}> Add a Project</Link>
                  </button>
                  <button className="px-6 w-[170px] text-center border border-gray-border rounded-md p-2 cursor-pointer hover:bg-main-purple">
                    <Link href={`/user/${user._id}`}> My Projects</Link>
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      </div>
    </>
  );
};

const DivCheckbox: React.FC<{}> = () => {
  return (
    <div className="bg-white border-2 rounded-md border-blue-400 w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
      <svg
        className="fill-current hidden w-3 h-3 text-blue-600 pointer-events-none"
        version="1.1"
        viewBox="0 0 17 12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(-9 -11)" fill="#1F73F1" fillRule="nonzero">
            <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Sidebar;
