import Card from "../../shared/components/Card";
import { PeerDetailsType } from "../../shared/schemas/peerDetails.schema";
import Image from "next/image";
import Link from "next/link";

type PeerCardProp = {
  data: PeerDetailsType;
};
const PeerCard: React.FC<PeerCardProp> = ({ data }) => {
  return (
    <Card scale>
      <Link href={`user/${data._id}`} passHref>
        <div className="text-sm font-normal flex flex-col items-start justify-around w-[300px] space-y-3 cursor-pointer h-[100%]">
          <h2 className=" mx-auto text-lg w-full text-main-gradient">
            <h2 className="text-center"> @{data.name}</h2>
          </h2>

          <h3 className="mx-auto text-slate-300">{data.about}</h3>
          <div className="flex items-center w-full justify-center">
            <div className="flex flex-wrap items-center justify-center">
              {data?.skills?.map((skill, index) => {
                return (
                  <span
                    key={index}
                    className="px-2 m-0.5 rounded-sm font-extralight bg-gradient text-neutral-800 "
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="flex  flex-col  justify-center w-full items-center">
            {data.open_to?.length ? (
              <h4 className="w-[65px] text-center font-light text-slate-300">
                Open to
              </h4>
            ) : (
              ""
            )}
            <div className="flex flex-wrap items-center justify-center">
              {data?.open_to?.map((item, index) => {
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
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default PeerCard;
