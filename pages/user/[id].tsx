import { useEffect, useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import PeerCard from "../../components/peerCard";
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
import Image from "next/image";
import Button from "../../shared/components/Button";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // api call
  const id = context.params?.id;
  let user = {};
  try {
    const userResponse = await getUser(id);
    user = userResponse.data || {};
  } catch (err: any) {
    console.error(err);
    toast.error(err.message);
  }
  return {
    props: { user, id },
  };
};

type Props = { user: PeerDetailsType; id: string };

const Peer: NextPage<Props> = (props: Props) => {
  useAuth();
  const { user, id } = props;

  const router = useRouter();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getUserProjects(router.query.id, { from: 1, to: 6 });
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, [router.isReady]);

  return (
    <>
      <div className="bg-main-bg text-white min-h-min-h-[calc(100vh-60px)] min-w-full flex flex-col gap-3 items-center">
        <h1 className="text-center text-2xl  my-2 border-b-2 border-cyan-500  capitalize">
          {user.name}
          {"'s Profile"}
        </h1>

        <div className="flex flex-col gap-2 items-start">
          <h2>About</h2>
          <div className="w-[90%] text-start my-3">{user.about}</div>
          <div className="flex flex-col gap-2">
            <h2>Contact peer</h2>
            {user.email && (
              <div className="flex items-center">
                <h2 className="mr-2 w-[80px] opacity-80 capitalize">Email:</h2>
                <span>{user.email}</span>
              </div>
            )}

            {user.github && (
              <div className="flex items-center">
                <h2 className="mr-2 w-[80px] opacity-80 capitalize">github:</h2>
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
                  linkedin:{" "}
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
                  twitter:{" "}
                </h2>
                <Link href={`https://www.twitter.com/${user.twitter}`} passHref>
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

          {user._id == id && (
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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-5 mb-8">
          {projects.length === 0 ? (
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
      </div>
    </>
  );
};

export default Peer;
