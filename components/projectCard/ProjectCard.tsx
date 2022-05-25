import Card from "../../shared/components/Card";
import { ProjectDetailsType } from "../../shared/schemas/projectDetails.schema";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { useContext } from "react";
import { themeContext } from "../../providers/themeProvider";

type ProjectCardProp = {
  data: ProjectDetailsType;
};
const ProjectCard: React.FC<ProjectCardProp> = ({ data }) => {
  const { theme } = useContext(themeContext);
  return (
    <Card scale>
      <Link href={`/projects/${data._id}`} passHref>
        <div className="text-sm font-normal flex flex-col items-start justify-around w-[300px] space-y-3 cursor-pointer">
          <div className="flex justify-between items-start w-full">
            <Link href={`/user/${data.creator_id}`} passHref>
              <div className=" flex items-center w-full gap-1 text-base">
                <AiOutlineUser></AiOutlineUser>
                <span
                  className={`a p-0 m-0 text-xs ${
                    theme === "light" ? "text-[#202020]" : "text-slate-300"
                  }`}
                >
                  {data.creator_name}
                </span>
              </div>
            </Link>
            {/* comment for future use */}
            {/* <span className="text-main-gradient flex ">
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
            </span> */}
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            {/* text-main-gradient */}
            <h2 className=" w-full text-center text-xl text-main-purple">
              {data.title}
            </h2>
            <div className="h-[60px]  mt-2 overflow-hidden">
              <h3
                className={`table-cell ${
                  theme === "light" ? "text-[#202020]" : "text-slate-300"
                } w-full text-md text-center capitalize align-middle`}
              >
                {data.description.length > 110
                  ? data.description.slice(0, 110) + "..."
                  : data.description}
              </h3>
            </div>
          </div>
          <div className="flex  items-center justify-center w-full overflow-hidden rounded-sm text-xs">
            {data?.tech?.map((item, index) => {
              return (
                <span key={index} className=" button-box">
                  {item}
                </span>
              );
            })}
          </div>

          <div className="flex items-center justify-center w-full rounded-sm  overflow-hidden font-base text-xs">
            {data?.need?.length !== 0 && <h4 className="px-1">Looking for</h4>}
            {data?.need?.map((item, index) => {
              return (
                <span key={index} className="button-box">
                  {item}
                </span>
              );
            })}
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default ProjectCard;
