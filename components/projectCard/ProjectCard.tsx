import Card from "../../shared/components/Card";
import { ProjectDetailsType } from "../../shared/schemas/projectDetails.schema";
import Image from "next/image";
import Link from "next/link";

type ProjectCardProp = {
  data: ProjectDetailsType;
};
const ProjectCard: React.FC<ProjectCardProp> = ({ data }) => {
  return (
    <Card scale>
      <Link href={`/projects/${data._id}`} passHref>
        <div className="text-sm font-normal flex flex-col items-start justify-around w-[300px] space-y-3 cursor-pointer">
          <div className="flex justify-between items-start w-full">
            <Link href={`/user/${data.creator_id}`} passHref>
              <span className="text-main-gradient hover:underline">
                @{data.creator_name}
              </span>
            </Link>
            {data.currentTeamSize && data.targetTeamSize && (
              <span className="text-main-gradient flex ">
                <Image
                  src="/images/people.svg"
                  alt="people icon"
                  layout="fixed"
                  height={20}
                  width={20}
                />
                <h4 className="px-1">
                  {data.currentTeamSize} / {data.targetTeamSize}
                </h4>
              </span>
            )}
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <h2 className="text-main-gradient w-full text-center text-lg">
              {data.title}
            </h2>
            <h3 className="text-slate-300 w-full text-center text-md">
              {data.description}
            </h3>
          </div>
          <div className="flex items-center justify-center w-full">
            {data?.tech?.map((item, index) => {
              return (
                <span
                  key={index}
                  className="px-2 m-0.5 rounded-sm font-extralight bg-gradient text-neutral-800 "
                >
                  {item}
                </span>
              );
            })}
          </div>
          <div className="flex items-center justify-center w-full">
            {data.need.length ? (
              <h4 className="text-slate-200">Looking for </h4>
            ) : (
              ""
            )}
            {data?.need?.map((item) => {
              return (
                <h4 className="text-slate-200 px-1 text-gradient-main">
                  {item}
                </h4>
              );
            })}
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default ProjectCard;
