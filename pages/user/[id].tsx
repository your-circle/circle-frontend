import { useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import { ProjectDetailsType } from "../../shared/schemas/projectDetails.schema";
import { getUser } from "../../shared/services/user.services";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ProjectCard from "../../components/projectCard";
import EmptyList from "../../shared/components/EmptyList";
import { getUserProjects } from "../../shared/services/projects.services";
import useAuth from "../../hooks/useAuth";
import { PeerDetailsType } from "../../shared/schemas/peerDetails.schema";
import Link from "next/link";
import { AiOutlineLink } from "react-icons/ai";
import Button from "../../shared/components/Button";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../shared/components/Loading";
import { skillEnum } from "../../shared/config/constants";
import { userContext } from "../../providers/userProvider";
import Image from "next/image";
import { BsGithub, BsLinkedin, BsPen, BsPencil } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FiTwitter } from "react-icons/fi";
import { RiLinkedinBoxLine } from "react-icons/ri";

const Peer: NextPage = () => {
  const emptyUser: PeerDetailsType = {
    _id: "",
    name: "",
    username: "",
    about: "",
    email: "",
    discord: "",
    linkedin: "",
    twitter: "",
    github: "",
    skills: skillEnum,
    open_to: [],
    avatarSeed: "",
    projects: [],
  };

  useAuth();

  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState<PeerDetailsType>(emptyUser);
  const [projects, setProjects] = useState<Array<ProjectDetailsType>>([]);
  const [hasMoreProject, setHasMoreProject] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState({ from: 1, to: 9 });
  const { user: loggedInUser } = useContext(userContext);

  const fetchUser = async () => {
    try {
      const userResponse = await getUser(id);
      setUser(userResponse.data || {});
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await getUserProjects(router.query.id, {
        from: range.from,
        to: range.to,
      });
      if (res.data.length < 9) {
        setHasMoreProject(false);
        setProjects([...projects, ...res.data]);
        setLoading(false);
      } else {
        setRange((range) => ({ from: range.from + 9, to: range.to + 9 }));
        setProjects([...projects, ...res.data]);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchProjects();
      fetchUser();
    }
  }, [router.isReady]);

  return (
    <>
      {loading ? (
        <div className="mx-auto w-fit">
          <Loading />
        </div>
      ) : (
        <div className="bg-main-bg text-white min-h-min-h-[calc(100vh-60px)] min-w-full flex flex-col gap-3 items-center">
          <div className="rounded-lg border-gray-border bg-card-bg relative flex flex-col items-center border border-red px-4 py-4 min-w-[500px] max-w-[85%]">
            {loggedInUser._id === id && (
              <div
                onClick={() => router.push("/profile/edit")}
                className="absolute top-4 right-4 cursor-pointer"
              >
                <BsPencil />
              </div>
            )}
            <Image
              src={`https://ui-avatars.com/api/?name=${user.name}`}
              alt="logo"
              height={80}
              width={80}
              className="rounded-[50%]"
            />
            <div className="text-center text-2xl my-2 capitalize">
              {user.name}
            </div>
            {user.username && <div>@{user.username}</div>}
            <div>{user.about || ""}</div>
            <div className="flex gap-4 mt-6 mb-4">
              {user.email && (
                <Link href={`mailto:${user.email}`}>
                  <a
                    target="_blank"
                    className="text-blue-400 scale-150 cursor-pointer"
                  >
                    <MdEmail />
                  </a>
                </Link>
              )}
              {user.github && (
                <Link href={`https://github.com/${user.github}`}>
                  <a
                    target="_blank"
                    className="text-blue-400 scale-150 cursor-pointer"
                  >
                    <BsGithub />
                  </a>
                </Link>
              )}
              {user.linkedin && (
                <Link href={`https://www.linkedin.com/in/${user.linkedin}`}>
                  <a
                    target="_blank"
                    className="text-blue-400 scale-150 cursor-pointer"
                  >
                    <BsLinkedin />
                  </a>
                </Link>
              )}
              {user.twitter && (
                <Link href={`https://twitter.com/${user.linkedin}`}>
                  <a
                    target="_blank"
                    className="text-blue-400 scale-150 cursor-pointer"
                  >
                    <FiTwitter />
                  </a>
                </Link>
              )}
            </div>

            <div className="flex flex-col items-start max-w-[90%]">
              <div className="flex my-2">
                <h2 className="mr-2 w-[70px] opacity-80 capitalize">Skills:</h2>
                <div className="flex flex-wrap">
                  {user.skills?.length === 0 && (
                    <span className=" button-box ">not available</span>
                  )}
                  {user.skills?.map((item, index) => {
                    return (
                      <span key={index} className=" button-box ">
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center">
                <h2 className="mr-2 w-[70px] opacity-80 capitalize">
                  open to:
                </h2>
                <div>
                  {user.open_to?.length === 0 && (
                    <span className=" button-box ">none</span>
                  )}
                  {user.open_to?.map((item, index) => {
                    return (
                      <span key={index} className=" button-box ">
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* user projects */}
          <h2 className="text-xl mt-4 text-main-purple border-b-2 border-main-purple">
            Projects
          </h2>
          <InfiniteScroll
            dataLength={projects.length}
            next={fetchProjects}
            hasMore={hasMoreProject}
            loader={
              <div className="mx-auto w-fit">
                <Loading />
              </div>
            }
            endMessage={
              projects.length !== 0 && (
                <h4 className="text-center mb-4">You Have Seen All</h4>
              )
            }
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-5 mb-8">
              {projects.length === 0 && !loading ? (
                <>
                  <span></span>
                  <EmptyList message="No Projects created yet" />
                </>
              ) : (
                projects.map((project, index) => {
                  return <ProjectCard data={project} key={index} />;
                })
              )}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

export default Peer;
