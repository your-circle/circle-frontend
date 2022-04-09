import type { GetStaticProps, NextPage } from "next";
import ProjectCard from "../../components/projectCard";
import Sidebar from "../../components/sidebar";
import EmptyList from "../../shared/components/EmptyList";
import { ProjectDetailsType } from "../../shared/schemas/projectDetails.schema";
import { getAllProjects } from "../../shared/services/projects.services";

export const getStaticProps: GetStaticProps = async (context) => {
  // api call
  let projectsResponse;
  try {
    projectsResponse = await getAllProjects();
  } catch (err) {
    console.error(err);
  }
  return {
    props: { projects: projectsResponse?.data || [] },
    revalidate: 5,
  };
};

type PropTypes = {
  projects: ProjectDetailsType[];
};

const Projects: NextPage<PropTypes> = (props: PropTypes) => {
  const { projects } = props;

  return (
    <>
      <Sidebar />
      <div className="bg-main-bg text-white min-h-[calc(100vh-60px)] min-w-full flex flex-col items-center">
        <h1 className="text-center w-full text-xl text-main-gradient my-2 ">
          Projects
        </h1>
        <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-2 xl:grid-cols-3">
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
