import { useState } from "react";
import type { NextPage } from "next";
import { ProjectDetailsType } from "../../shared/schemas/projectDetails.schema";
import ProjectCard from "../../components/projectCard";

const Projects: NextPage = () => {
  const testProp: ProjectDetailsType = {
    title: "Circle",
    author: "lsd",
    about: "Connecting peers, projects and mentors",
    projectType: ["Fullstack"],
    needs: ["Mentors", "Developers"],
    currentTeamSize: 5,
    targetTeamSize: 6,
  };

  const testArray = [testProp];
  const [ProjectData, setProjectdata] = useState(testArray);

  return (
    <>
      <div className="bg-main-bg  text-white min-h-screen min-w-full">
        <h1 className="text-center w-full text-xl text-main-gradient my-2 ">
          Find Your Peers
        </h1>
        <div className="">
          {ProjectData.map((Project, index) => {
            return <ProjectCard data={Project} key={index} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Projects;
