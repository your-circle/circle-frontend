import Card from "../../shared/components/Card";
import { ProjectDetailsType } from "../../shared/schemas/projectDetails.schema";
import Image from "next/image";

type ProjectCardProp = {
  data: ProjectDetailsType;
};
const ProjectCard: React.FC<ProjectCardProp> = ({ data }) => {
  return (
    <Card>
      <div className="text-sm font-normal flex flex-col items-start justify-around w-[300px] space-y-3 cursor-default">
        <div className="flex justify-between items-start w-full">
          <h2 className="text-main-gradient">@{data.author}</h2>
          <span className="text-main-gradient flex ">
            <Image
              src="/images/people.svg"
              layout="fixed"
              height={20}
              width={20}
            />
            <h4 className="px-1">
              {data.currentTeamSize} / {data.targetTeamSize}
            </h4>
          </span>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="text-main-gradient w-full text-center text-lg">
            {data.title}
          </h2>
          <h3 className="text-slate-300 w-full text-center text-md">
            {data.about}
          </h3>
        </div>
        <div className="flex items-center justify-center w-full">
          {data.projectType.map((item) => {
            return (
              <span className="px-2 m-0.5 rounded-full font-extralight bg-gradient text-neutral-800 ">
                {item}
              </span>
            );
          })}
        </div>
        <div className="flex items-center justify-start w-full">
          <h4 className="px-2">Looking for:</h4>
          {data.needs.map((item) => {
            return (
              <span className="px-2 m-0.5 rounded-full font-extralight bg-gradient text-neutral-800 ">
                {item}
              </span>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
