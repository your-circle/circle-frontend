import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { userContext } from "../../providers/userProvider";
import { openToArray } from "../../shared/schemas/peerDetails.schema";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { RiFindReplaceLine } from "react-icons/ri";
import { BiFilterAlt } from "react-icons/bi";

import {
  needsArray,
  projectTypeArray,
} from "../../shared/schemas/projectDetails.schema";

type Props = {
  type: string;
  filters: object;
  setFilters: any;
  setRange: any;
  setProjects?: any;
  setPeers?: any;
  setHasMoreProject?: any;
  setHasMorePeers?: any;
  onTitleChange?: any;
};

const Searchbar: React.FC<Props> = (props: Props) => {
  const {
    filters,
    setFilters,
    setRange,
    setProjects,
    setHasMoreProject,
    setPeers,
    setHasMorePeers,
    onTitleChange,
  } = props;
  const [localFilters, setLocalFilters] = useState<any>(filters);
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [dropdownSkills, setDropdownSkills] = useState(false);
  const [dropdownNeeds, setDropdownNeeds] = useState(false);
  const [title, setTitle] = useState("");

  const updateLocalFilters = (type: any, key: string, value: any) => {
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
    setRange({ from: 1, to: 9 });
    if (props.type === "PROJECTS") {
      setProjects([]);
      setHasMoreProject(true);
    }

    if (props.type === "PEERS") {
      setPeers([]);
      setHasMorePeers(true);
    }
    setFilters(localFilters);
    setSidebarStatus(false);
  };

  useEffect(() => {
    // console.log(setRange);
    setRange({ from: 1, to: 9 });
  }, [props.type]);

  return (
    <>
      <div className="w-9/12 z-20 m-auto scrollbar overflow-y-scroll">
        <>
          <div className={`flex m-1`}>
            <div className="flex flex-col sm:flex-row gap-3 w-full my-3">
              <div className="flex flex-1">
                <input
                  name="title"
                  type="text"
                  key="text"
                  placeholder={`Search ${props.type.toLowerCase()}`}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (e.target.value.length == 0 && title.length > 0) {
                      onTitleChange("");
                    }
                  }}
                  value={title}
                  className="text-white h-full px-4 py-3 relative focus:border-gray-800 border-gray-border border border-r-0 placeholder-slate-200 rounded-0 rounded-l-sm flex-1 bg-transparent"
                />
                <button
                  className="px-4 bg-blue-500 flex gap-2 items-center  rounded-0 rounded-r-sm"
                  onClick={() => onTitleChange(title)}
                >
                  <RiFindReplaceLine></RiFindReplaceLine>
                  Search
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  className="w-fit h-full bg-blue-500 px-4 py-2.5 rounded-sm flex gap-2 items-center"
                  onClick={() => setSidebarStatus(!sidebarStatus)}
                >
                  <BiFilterAlt></BiFilterAlt>
                  <span>Filters</span>
                </button>
              </div>
            </div>
          </div>
          <div
            className={`${
              sidebarStatus ? " visible" : "hidden"
            } justify-center items-start pt-12 h-10/12  px-10 py-4 border-gray-border bg-main-bg border  flex 
            z-50
            w-1/4
            inset-center
            fixed
            max-h-[90vh]
            overflow-auto
            `}
          >
            <button
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setSidebarStatus(!sidebarStatus)}
            >
              <AiOutlineClose size={25}></AiOutlineClose>
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
                    className="px-6 my-4 text-center border border-gray-border rounded-md p-2 cursor-pointer bg-blue-500"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>

              {/* {isLoggedIn && (
                <div className="space-y-2 flex flex-col items-center">
                  <button className="px-6 w-[170px] text-center border border-gray-border rounded-md p-2 cursor-pointer hover:bg-main-purple">
                    <Link href={`/projects/new`}> Add a Project</Link>
                  </button>
                  <button className="px-6 w-[170px] text-center border border-gray-border rounded-md p-2 cursor-pointer hover:bg-main-purple">
                    <Link href={`/user/${user._id}`}> My Projects</Link>
                  </button>
                </div>
              )} */}
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

export default Searchbar;
