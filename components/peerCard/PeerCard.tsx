import Card from "../../shared/components/Card";
import { PeerDetailsType } from "../../shared/schemas/peerDetails.schema";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { useContext } from "react";
import { themeContext } from "../../providers/themeProvider";

type PeerCardProp = {
  data: PeerDetailsType;
};
const PeerCard: React.FC<PeerCardProp> = ({ data }) => {
  const { theme } = useContext(themeContext);
  if (!data.about) {
    return <></>;
  }
  return (
    <>
      <Card scale>
        <Link href={`user/${data._id}`} passHref>
          <div className="text-sm font-normal gap-2 flex flex-col items-start justify-around w-[300px] space-y-3 cursor-pointer">
            <div className=" flex items-center justify-between w-full gap-1 text-base">
              <div className="flex justify-center items-center">
                <AiOutlineUser />
                <span className="px-1">{data.name}</span>
              </div>
              <div>
                {" "}
                {data.username && (
                  <span
                    className={`${
                      theme === "light" ? "text-[#202020]" : "text-slate-300"
                    } text-xs`}
                  >{`@${data.username}`}</span>
                )}
              </div>
            </div>
            <h3
              className={`mx-auto w-full pl-1 ${
                theme === "light" ? "text-[#202020]" : "text-slate-200"
              } text-center  overflow-hidden`}
            >
              {data.about || "No description available"}
            </h3>
            <div className="flex w-full items-center pl-1">
              {data?.skills?.length !== 0 && (
                <h4 className="w-1/4 font-light  ">Skills :</h4>
              )}
              <div className="flex flex-wrap flex-1 items-center justify-start">
                {data?.skills?.map((skill: any, index: number) => {
                  return (
                    <span key={index} className=" button-box ">
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="flex w-full items-center pl-1">
              {data?.open_to?.length !== 0 && (
                <h4 className="w-1/4 font-light  ">Open to:</h4>
              )}
              <div className="flex flex-wrap items-center justify-center">
                {data?.open_to?.map((item, index) => {
                  return (
                    <span key={index} className=" button-box">
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </Link>
      </Card>
    </>
  );
};

export default PeerCard;
