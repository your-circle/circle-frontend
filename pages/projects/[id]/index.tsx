import type { GetServerSideProps, NextPage } from "next";
import { toast } from "react-toastify";
import {
  getProject,
  joinProject,
} from "../../../shared/services/projects.services";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../../providers/userProvider";
import { useRouter } from "next/router";
import { ProjectDetailsType } from "../../../shared/schemas/projectDetails.schema";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // api call
  const { id } = context.params;
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

type PropTypes = { data: ProjectDetailsType };

const Project: NextPage<PropTypes> = (props: PropTypes) => {
  const router = useRouter();
  const { user } = useContext(userContext);
  const [data, setData] = useState(props.data);
  const [requested, setRequested] = useState<boolean>(false);
  const [isMember, setIsMember] = useState<boolean>(false);

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
  }, [data]);

  const applyToProject = async () => {
    try {
      await joinProject(data._id);
      const projectRes = await getProject(data._id);
      setData(projectRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-[90%] mx-auto">
      <div className="flex flex-col gap-2 items-center">
        <span className=" text-2xl border-b-2 text-main-purple border-main-purple">
          {data.title}
        </span>
        <span>
          by{" "}
          <Link href={`/user/${data._id}`} passHref>
            <span className="opacity-80 underline hover:opacity-100 text-white cursor-pointer">
              {data.creator_name}
            </span>
          </Link>
        </span>
        <div className="flex flex-col gap-2 items-start">
          <div className="w-[90%] text-center">{data.description}</div>
          <div className="flex items-center">
            <h2 className="mr-2 w-[120px]">Tech Stack:</h2>
            <div>
              {data?.tech?.length === 0 && (
                <span className="px-2 m-0.5 rounded-sm font-extralight bg-gradient text-neutral-800 ">
                  none
                </span>
              )}
              {data?.tech?.map((item, index) => {
                return (
                  <span
                    key={index}
                    className="px-2 m-0.5 rounded-sm font-extralight bg-gradient text-neutral-800 "
                  >
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <h2 className="mr-2 w-[120px]">Looking For:</h2>
            <div>
              {data?.need?.length === 0 && (
                <span className="px-2 m-0.5 rounded-sm font-extralight bg-gradient text-neutral-800 ">
                  none
                </span>
              )}
              {data?.need?.map((item, index) => {
                return (
                  <span
                    key={index}
                    className="px-2 m-0.5 rounded-sm font-extralight bg-gradient text-neutral-800 "
                  >
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <h2 className="mr-2 w-[120px]">Current Team:</h2>
            <div>
              {data?.team?.length === 0 && (
                <span className="px-2 m-0.5 rounded-sm font-extralight bg-gradient text-neutral-800 ">
                  none
                </span>
              )}
              {data?.team?.map((user: any, index: number) => {
                return (
                  <Link key={index} href={`/user/${user._id}`}>
                    <a className="px-2 m-0.5 rounded-sm font-extralight bg-gradient text-neutral-800 ">
                      {user.name}
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <h2 className="mr-2 w-[120px]">Status:</h2>
            <span
              className={data.is_team_full ? "text-red-500" : "text-green-500"}
            >
              {data.is_team_full ? "closed" : "open"}
            </span>
          </div>
        </div>
        {isMember ? (
          <div className="text-lg text-disabled-purple">
            You are a member of this project team!
          </div>
        ) : (
          <button
            className={`bg-main-purple ${
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
