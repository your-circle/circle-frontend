import { useEffect, useState } from "react";
import type { NextPage } from "next";
import PeerCard from "../../../components/peerCard";
import { ProjectDetailsType } from "../../../shared/schemas/projectDetails.schema";
import { getUser } from "../../../shared/services/user.services";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ProjectCard from "../../../components/projectCard";
import EmptyList from "../../../shared/components/EmptyList";

const Peer: NextPage = () => {
  const router = useRouter();
  const params = router.query;

  const [currentUser, setCurrentUser] = useState({});
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
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    fetchUser();
  }, [router.isReady]);

  const fetchUser = async () => {
    try {
      const res = await getUser(params.id);
      setCurrentUser(res.data);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="bg-main-bg  text-white min-h-screen min-w-full">
        <h1 className="text-center w-full text-xl text-main-gradient my-2 ">
          {currentUser.name || params.id}'s Projects
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
