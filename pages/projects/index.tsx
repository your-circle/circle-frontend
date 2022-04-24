import type { NextPage } from "next";
import { useEffect, useState } from "react";
import ProjectCard from "../../components/projectCard";
import Searchbar from "../../components/searchbar";
import EmptyList from "../../shared/components/EmptyList";
import Loading from "../../shared/components/Loading";
import { ProjectDetailsType } from "../../shared/schemas/projectDetails.schema";
import { getAllProjects } from "../../shared/services/projects.services";
import { BsSearch } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";

const Projects: NextPage = () => {
  const [filters, setFilters] = useState({
    title: "",
    tech: [],
    need: [],
  });
  const [range, setRange] = useState({
    from: 1,
    to: 9,
  });
  const [projects, setProjects] = useState<Array<ProjectDetailsType>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMoreProject, setHasMoreProject] = useState<boolean>(true);

  const onTitleChange = (e: any) => {
    setProjects([]);
    setRange({ from: 1, to: 9 });
    setHasMoreProject(true);
    setFilters({
      ...filters,
      title: e,
    });
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const payload = { ...filters, ...range };
      const res = await getAllProjects(payload);
      const data = res.data || [];
      if (data.length < 9) {
        setHasMoreProject(false);
        setProjects([...projects, ...data]);
        setLoading(false);
      } else {
        setProjects([...projects, ...data]);
        setRange((range) => ({ from: range.from + 9, to: range.to + 9 }));
        setLoading(false);
      }
    } catch (err: any) {
      setLoading(false);
      console.error(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [filters]);

  return (
    <div className="bg-main-bg">
      {/* <Sidebar type="PROJECTS" filters={filters} setFilters={setFilters} onTitleChange={onTitleChange} /> */}

      <Searchbar
        type="PROJECTS"
        filters={filters}
        setFilters={setFilters}
        setRange={setRange}
        setProjects={setProjects}
        setHasMoreProject={setHasMoreProject}
        onTitleChange={onTitleChange}
      />
      <div className="bg-main-bg text-white min-h-[calc(100vh-60px)] min-w-full flex flex-col items-center">
        {/* {loading &&
          <Loading />} */}
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
          <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-2 xl:grid-cols-3 mb-6">
            {projects.length === 0 && !loading ? (
              <>
                <span></span>
                <EmptyList message="No Projects Available" />
              </>
            ) : (
              projects.map((project: ProjectDetailsType, index: number) => {
                return <ProjectCard data={project} key={index} />;
              })
            )}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Projects;
