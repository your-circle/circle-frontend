import type { GetServerSideProps, NextPage } from "next";
import { toast } from "react-toastify";
import {
  addProjectMember,
  editProject,
  getProject,
  joinProject,
} from "../../../shared/services/projects.services";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../../providers/userProvider";
import { ProjectDetailsType } from "../../../shared/schemas/projectDetails.schema";
import Image from "next/image";
import Input from "../../../shared/components/Input";
import Card from "../../../shared/components/Card";
import Choice from "../../../shared/components/Choice/Choice";
import { useRouter } from "next/router";
import { themeContext } from "../../../providers/themeProvider";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // api call
  const id = context.params?.id;
  let projectData;
  try {
    projectData = await getProject(id);
  } catch (err: any) {
    console.error(err.message);
    toast.error(err.message);
  }
  return {
    props: { data: projectData?.data || {} },
  };
};

type Props = { data: ProjectDetailsType };

const Project: NextPage<Props> = (props: Props) => {
  const router: any = useRouter();
  const { theme } = useContext(themeContext);
  const { user } = useContext(userContext);
  const [data, setData] = useState<any>(props.data);
  const [requested, setRequested] = useState<boolean>(false);
  const [isMember, setIsMember] = useState<boolean>(false);
  const defaultInput = {
    title: "",
    description: "",
    tech: [],
    need: [],
    request_list: [],
    team: [],
    is_team_full: false,
  };
  const [input, setInput] = useState<any>(defaultInput);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const allNeeds = ["Mentor", "Developers"];
  const isCreator = data.creator_id === user._id;

  useEffect(() => {
    const requestList: string[] = data?.request_list || [];
    let userIndex = requestList.findIndex(
      (userData: any) => userData._id === user._id
    );
    setRequested(userIndex != -1);
    const memberList: object[] = data?.team || [];
    userIndex = memberList.findIndex(
      (userData: any) => userData._id === user._id
    );
    setIsMember(userIndex != -1);

    resetInput();
  }, [data]);

  const fetchProject = async () => {
    try {
      const res = await getProject(router.query.id);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const resetInput = () => {
    let changes: any = {};
    for (const [key, value] of Object.entries(data)) {
      changes[key] = value;
    }

    setInput({
      ...input,
      ...changes,
    });
  };

  const onInputChange = (key: string, value: string) => {
    setInput({
      ...input,
      [key]: value,
    });
  };

  const handleToggle = (element: string, inputField: string) => {
    const current = [...input[inputField]];
    const isSelected = current.includes(element);
    if (!isSelected) {
      setInput({ ...input, [inputField]: [...current, element] });
      return;
    }
    const index = current.indexOf(element);
    current.splice(index, 1);
    setInput({ ...input, [inputField]: current });
  };

  const discardChanges = () => {
    resetInput();
    setIsEditing(false);
  };

  const saveChanges = async (e: any) => {
    e.preventDefault();
    try {
      await editProject(router.query.id, {
        title: input.title,
        description: input.description,
        tech: input.tech,
        need: input.need,
      });

      fetchProject();
      setIsEditing(false);
    } catch (err: any) {
      toast.error(err.message || "something went wrong, try again!");
    }
  };

  const applyToProject = async () => {
    try {
      await joinProject(data._id);
      const projectRes = await getProject(data._id);
      setData(projectRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addMember = async (index: number) => {
    // api call
    try {
      await addProjectMember(data._id, data.request_list[index]._id);
      fetchProject();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRequest = (index: number) => {
    // delete request
  };

  const removeMember = (index: number) => {
    // remove user from team
  };

  const EditprojectForm = () => {
    return (
      <div
        className={`flex items-center flex-col gap-8 justify-center ${
          theme === "light" ? "bg-light-theme-bg" : "bg-main-bg"
        } w-full h-full`}
      >
        <Card>
          <div className="text-white min-h-full w-[360px] sm:w-fit">
            <div className="flex gap-20 items-center py-2 mx-[45px] ">
              <h1 className="mx-auto text-2xl text-main-purple mb-4">
                {data.title}
              </h1>
            </div>
            <form
              className={`flex flex-col px-10 mx-2  gap-3 ${
                !isEditing ? "pointer-events-none" : ""
              }`}
            >
              <div className="sm:flex items-center gap-4 mb-2">
                <span className="w-[100px]">Title</span>
                <Input
                  name="title"
                  type="text"
                  key="title"
                  value={input.title}
                  onChange={onInputChange}
                  transparent={true}
                  fullWidth={true}
                />
              </div>
              <div className="sm:flex items-center gap-4 mb-2">
                <span className="w-[100px]">Description</span>
                <Input
                  transparent={true}
                  name="description"
                  type="textarea"
                  key="description"
                  fullWidth={true}
                  value={input.description}
                  onChange={onInputChange}
                />
              </div>
              {/*  multiple */}
              <div className="h-full focus:border-gray-800 rounded-sm w-full flex flex-col  justify-center items-center">
                <div className="flex gap-2 flex-wrap my-2 border-gray-border border w-full px-3 py-2">
                  {input.need.length !== 0 &&
                    input.need.map((item: any, index: number) => (
                      <Choice
                        choice={item}
                        key={index}
                        selectedChoice={input.need}
                        handleToggle={() => handleToggle(item, "need")}
                      />
                    ))}
                  {input.need.length === 0 && (
                    <span className="text-slate-200 py2 select-none mx-auto">
                      Add your needs here
                    </span>
                  )}
                </div>
                <div className="flex gap-2 flex-wrap my-2">
                  {allNeeds.map((item, index) => (
                    <Choice
                      choice={item}
                      key={index}
                      selectedChoice={input.need}
                      handleToggle={() => handleToggle(item, "need")}
                    />
                  ))}
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-center items-center w-full gap-3">
                  <button
                    className="rounded-md bg-blue-500 py-2 disabled:bg-slate-500 w-1/2"
                    onClick={discardChanges}
                    disabled={!isEditing}
                  >
                    Discard Changes
                  </button>
                  <button
                    className="rounded-md bg-blue-500  py-2 disabled:bg-slate-500 w-1/2"
                    onClick={saveChanges}
                    disabled={!isEditing}
                  >
                    Save
                  </button>
                </div>
              )}
            </form>

            {!isEditing && (
              <div
                className="cursor-pointer flex items-center justify-center border rounded-md border-main-purple"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="edit"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Image
                  src="/images/edit-purple.svg"
                  alt="edit"
                  height={25}
                  width={25}
                />
                <h2 className="p-3 px-2"> Edit Project</h2>
              </div>
            )}
          </div>
        </Card>
        <div className="flex flex-col w-full items-center">
          <Card>
            <div className="w-[340px]">
              <div className="text-xl w-[340px] my-2 text-main-gradient">
                Requests List:
              </div>
              <div className="flex flex-col gap-2 my-2 border-gray-border border w-full min-w-fit px-3 py-2">
                {input.request_list.length !== 0 &&
                  input.request_list.map(
                    (user: { _id: string; name: string }, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <Link href={`/user/${user._id}`}>
                          <a className="hover:opacity-80 w-[300px]">
                            {user.name}
                          </a>
                        </Link>
                        <div className="flex items-center">
                          <div className="mr-2 h-[20px] cursor-pointer">
                            <Image
                              src="/images/add-icon.svg"
                              alt="add"
                              height={20}
                              width={20}
                              onClick={() => addMember(index)}
                            />
                          </div>
                          <div className="h-[22px] cursor-pointer">
                            <Image
                              src="/images/delete-icon.svg"
                              alt="add"
                              height={22}
                              width={22}
                              onClick={() => deleteRequest(index)}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  )}
                {input.request_list.length === 0 && (
                  <span className="text-slate-200 py2 select-none text-gray-500">
                    Join requests will be displayed here!
                  </span>
                )}
              </div>
            </div>
          </Card>
          <Card>
            <div className="w-[340px]">
              <div className="text-xl w-[340px] my-2 text-main-gradient">
                Team Members:
              </div>
              <div className="flex flex-col gap-2 my-2 border-gray-border border w-full min-w-fit px-3 py-2">
                {input.team.length !== 0 &&
                  input.team.map(
                    (user: { _id: string; name: string }, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <Link href={`/user/${user._id}`}>
                          <a className="hover:opacity-80 w-[320px] mr-2">
                            {user.name}
                          </a>
                        </Link>
                        <div className="h-[22px] cursor-pointer">
                          <Image
                            src="/images/delete-icon.svg"
                            alt="add"
                            height={22}
                            width={22}
                            onClick={() => removeMember(index)}
                          />
                        </div>
                      </div>
                    )
                  )}
                {input.team.length === 0 && (
                  <span className="text-slate-200 py2 select-none text-gray-500">
                    All team members will be displayed here!
                  </span>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  if (isCreator) {
    return <EditprojectForm />;
  }

  return (
    <div
      className={`px-[5%] mx-auto h-[calc(100vh-65px)] overflow-auto ${
        theme === "light"
          ? "bg-light-theme-bg text-[#202020]"
          : "bg-main-bg text-white"
      }`}
    >
      <div className="flex flex-col gap-2 items-center">
        <span className=" text-3xl text-main-purple">{data.title}</span>
        <span className={theme === "light" ? "text-black" : "text-white"}>
          by
          <Link href={`/user/${data._id}`} passHref>
            <span
              className={`opacity-80 px-1 underline hover:opacity-100 cursor-pointer`}
            >
              {data.creator_name}
            </span>
          </Link>
        </span>
        <div className="flex flex-col gap-3 items-start">
          <div
            className={`text-center w-full text-xl mt-5 mb-3 ${
              theme === "light" ? "text-black" : "text-slate-300"
            }`}
          >
            {data.description}
          </div>

          <div className="flex items-center">
            <h2 className="mr-2 w-[120px] opacity-80">Tech Stack:</h2>
            <div>
              {data?.tech?.length === 0 && (
                <span className=" button-box">none</span>
              )}
              {data?.tech?.map((item: any, index: number) => {
                return (
                  <span key={index} className=" button-box ">
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <h2 className="mr-2 w-[120px] opacity-80">Looking For:</h2>
            <div>
              {data?.need?.length === 0 && (
                <span className=" button-box">none</span>
              )}
              {data?.need?.map((item: any, index: number) => {
                return (
                  <span key={index} className=" button-box ">
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
          <br />
          <div className="flex items-center">
            <h2 className="mr-2 w-[120px] opacity-80">Current Team:</h2>
            <div>
              {data?.team?.length === 0 && (
                <span className=" button-box">None</span>
              )}
              {data?.team?.map((user: any, index: number) => {
                return (
                  <Link key={index} href={`/user/${user._id}`}>
                    <a className="capitalize m-0.5 mx-0.5 px-2 py-[1px] rounded-sm border border-main-purple text-main-purple">
                      {user.name}
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <h2 className="mr-2 w-[120px] opacity-80">Status:</h2>
            <span
              className={`m-0.5 mx-0.5 px-2 py-[1px] rounded-sm border ${
                data.is_team_full
                  ? "text-red-500 border-red-500"
                  : "text-green-500  border-green-500 "
              }`}
            >
              {data.is_team_full ? "Closed" : "Open"}
            </span>
          </div>
        </div>
        {isMember ? (
          <div className="text-lg text-blue-300">
            You are a member of this project&apos;s team!
          </div>
        ) : (
          <button
            className={`bg-blue-500 ${
              requested ? "bg-disabled-purple" : ""
            } rounded-sm text-white px-4 py-2 mt-4`}
            onClick={applyToProject}
            disabled={requested}
          >
            {requested ? "Requested" : "Join the Team"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Project;
