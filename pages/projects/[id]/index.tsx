import { useEffect, useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import PeerCard from "../../../components/peerCard";
import { ProjectDetailsType } from "../../../shared/schemas/projectDetails.schema";
import { getUser } from "../../../shared/services/user.services";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ProjectCard from "../../../components/projectCard";
import EmptyList from "../../../shared/components/EmptyList";
import { getUserProjects } from "../../../shared/services/projects.services";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // api call
  const { id } = context.params;
  let userResponse = {},
    projectsResponse = [];
  try {
    userResponse = await getUser(id);
    projectsResponse = await getUserProjects(id);
  } catch (err: any) {
    console.error(err);
    toast.error(err.message);
  }
  return {
    props: { user: userResponse?.data, projects: projectsResponse?.data || [] },
  };
};

const Peer: NextPage = (props: any) => {
  const { user, projects } = props;

  return (
    <>
      <div className="bg-main-bg text-white min-h-min-h-[calc(100vh-60px)] min-w-full">
        <h1 className="text-center w-full text-xl text-main-gradient my-2 ">
          {user.name}'s Projects
        </h1>
        <div className="">
          {projects.length === 0 ? (
            <EmptyList message="No Projects created yet" />
          ) : (
            projects.map((project, index) => {
              return <ProjectCard data={project} key={index} />;
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Peer;
