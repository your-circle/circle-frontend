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
          <h1 className="text-center text-2xl  my-2 border-b-2 border-main-purple  capitalize">
            {user.name}
            {"'s Profile"}
          </h1>

          <div className="flex flex-col gap-2 items-start">
            <div className="w-[90%] text-start my-3">{user.username || ""}</div>
            <div className="w-[90%] text-center text-slate-300 text-lg my-3">
              {user.about || "About Not Given"}
            </div>

            <div className="flex flex-col gap-2">
              {user.email && (
                <div className="flex items-center">
                  <h2 className="mr-2 w-[80px] opacity-80 capitalize">
                    Email:
                  </h2>
                  <span>{user.email}</span>
                </div>
              )}

              {user.github && (
                <div className="flex items-center">
                  <h2 className="mr-2 w-[80px] opacity-80 capitalize">
                    Github:
                  </h2>
                  <Link href={`https://www.github.com/${user.github}`} passHref>
                    <a target="_blank" className="flex items-center">
                      {user.github}
                      <div className="ml-2 mt-1">
                        <AiOutlineLink></AiOutlineLink>
                      </div>
                    </a>
                  </Link>
                </div>
              )}
              {user.linkedin && (
                <div className="flex items-center">
                  <h2 className="mr-2 w-[80px] opacity-80 capitalize hover:scale-110">
                    Linkedin:{" "}
                  </h2>
                  <Link
                    href={`https://www.linkedin.com/${user.linkedin}`}
                    passHref
                  >
                    <a target="_blank" className="flex items-center">
                      {user.linkedin}
                      <div className="ml-2 mt-1">
                        <AiOutlineLink></AiOutlineLink>
                      </div>
                    </a>
                  </Link>
                </div>
              )}
              {user.twitter && (
                <div className="flex items-center">
                  <h2 className="mr-2 w-[80px] opacity-80 capitalize">
                    Twitter:{" "}
                  </h2>
                  <Link
                    href={`https://www.twitter.com/${user.twitter}`}
                    passHref
                  >
                    <a target="_blank" className="flex items-center">
                      {user.twitter}
                      <div className="ml-2 mt-1">
                        <AiOutlineLink></AiOutlineLink>
                      </div>
                    </a>
                  </Link>
                </div>
              )}
            </div>

            <div className="flex items-center my-2">
              <h2 className="mr-2 w-[80px] opacity-80 capitalize">Skills:</h2>
              <div>
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
              <h2 className="mr-2 w-[80px] opacity-80 capitalize">open to:</h2>
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

            {loggedInUser._id === id && (
              <div className="flex w-full justify-center my-3">
                <Button href="/profile/edit">
                  <h1 className="text-opacity-80 margin-auto hover:text-opacity-100 cursor-pointer duration-200 w-16 px-1 text-center">
                    Edit
                  </h1>
                </Button>
              </div>
            )}
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
