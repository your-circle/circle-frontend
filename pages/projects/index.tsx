import type { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import ProjectCard from "../../components/projectCard";
import Sidebar from "../../components/sidebar";
import EmptyList from "../../shared/components/EmptyList";
import Loading from "../../shared/components/Loading";
import { ProjectDetailsType } from "../../shared/schemas/projectDetails.schema";
import { getAllProjects } from "../../shared/services/projects.services";
import { BsSearch } from "react-icons/bs";

const Projects: NextPage = () => {
  const [filters, setFilters] = useState({
    from: 1,
    to: 6,
    title: "",
    tech: [],
    need: [],
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [filters]);

  const onTitleChange = (e: any) => {
    setFilters({
      ...filters,
      title: e.target.value,
    });
  };
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const payload = { ...filters };
      const res = await getAllProjects(payload);
      setProjects(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <>
      <Sidebar type="PROJECTS" filters={filters} setFilters={setFilters} />
      <div className="bg-main-bg text-white min-h-[calc(100vh-60px)] min-w-full flex flex-col items-center">
        <h1 className="text-center w-full text-xl text-main-gradient my-2 ">
          Projects
        </h1>
        <div className="my-2 relative">
          <div className="absolute top-3 left-3 z-20 mt-[2px]">
            <BsSearch />
          </div>
          <input
            type="text"
            placeholder="search by title"
            value={filters.title}
            onChange={onTitleChange}
            className="bg-main-gray pl-10 pr-2 pt-2 pb-3 text-l rounded-sm border-[1px] border-gray-600"
          />
        </div>
        {loading ? (
          <Loading />
        ) : (
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
        )}
      </div>
    </>
  );
};

export default Projects;
