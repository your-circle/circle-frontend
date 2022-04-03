import { useEffect, useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import PeerCard from "../../../components/peerCard";
import { ProjectDetailsType } from "../../../shared/schemas/projectDetails.schema";
import { getUser } from "../../../shared/services/user.services";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ProjectCard from "../../../components/projectCard";
import EmptyList from "../../../shared/components/EmptyList";
import {
  getProject,
  getUserProjects,
} from "../../../shared/services/projects.services";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // api call
  const { id } = context.params;
  let projectData = {};
  try {
    projectData = await getProject(id);
  } catch (err: any) {
    console.error(err);
    toast.error(err.message);
  }
  return {
    props: { data: projectData?.data || {} },
  };
};

const Project: NextPage = (props: any) => {
  const { data } = props;
  console.log("data", data);

  return (
    <div className="w-max mx-auto">
      <ProjectCard data={data} />
    </div>
  );
};

export default Project;
