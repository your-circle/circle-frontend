import type { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import ProjectCard from "../../components/projectCard";
import Sidebar from "../../components/sidebar";
import EmptyList from "../../shared/components/EmptyList";
import { ProjectDetailsType } from "../../shared/schemas/projectDetails.schema";
import { getAllProjects } from "../../shared/services/projects.services";

const Projects: NextPage = () => {
  const [range, setRange] = useState({ from: 1, to: 6 });
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, [range]);

  const fetchProjects = async () => {
    try {
      const res = await getAllProjects(range);
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="bg-main-bg text-white min-h-[calc(100vh-60px)] min-w-full flex flex-col items-center">
        <h1 className="text-center w-full text-xl text-main-gradient my-2 ">
          Projects
        </h1>
        <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-2 xl:grid-cols-3 mb-6">
          {projects.length === 0 ? (
            <>
              <span></span>
              <EmptyList message="No Projects available" />
            </>
          ) : (
            projects.map((project: ProjectDetailsType, index: number) => {
              return <ProjectCard data={project} key={index} />;
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;
