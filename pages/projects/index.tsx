import type { NextPage } from "next";
import { useEffect, useState } from "react";
import ProjectCard from "../../components/projectCard";
import Sidebar from "../../components/sidebar";
import EmptyList from "../../shared/components/EmptyList";
import Loading from "../../shared/components/Loading";
import { ProjectDetailsType } from "../../shared/schemas/projectDetails.schema";
import { getAllProjects } from "../../shared/services/projects.services";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../shared/components/Loading";
import { toast } from "react-toastify";

const Projects: NextPage = () => {
  const [filters, setFilters] = useState({
    from: 1,
    to: 6,
    tech: [],
    need: [],
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [filters]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const payload = { ...filters };
      const res = await getAllProjects(payload);
      setProjects(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [range, setRange] = useState({ from: 1, to: 9 });
  const [projects, setProjects] = useState<Array<ProjectDetailsType>>([]);
  const [hasMoreProject, setHasMoreProject] = useState<boolean>(true);

  useEffect(() => {
    fetchProjects();
    setLoading(false);
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await getAllProjects(range);
      if (res.data.length === 0) {
        setHasMoreProject(false);
      } else {
        setProjects([...projects, ...res.data]);
        setRange((range) => ({ from: range.from + 9, to: range.to + 9 }));
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <>
      <Sidebar type="PROJECTS" filters={filters} setFilters={setFilters} />
      <div className="bg-main-bg text-white min-h-[calc(100vh-60px)] min-w-full flex flex-col items-center">
        <h1 className="text-center w-full text-xl text-main-gradient my-2 ">
          Projects
        </h1>
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-2 xl:grid-cols-3 mb-6">
            {projects.length === 0 && loading ? (
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
        )}
      </div>
    </>
  );
};

export default Projects;
