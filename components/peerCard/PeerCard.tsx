import Card from "../../shared/components/Card";
import { PeerDetailsType } from "../../shared/schemas/peerDetails.schema";
import Image from "next/image";
import Link from "next/link";

type PeerCardProp = {
  data: PeerDetailsType;
};
const PeerCard: React.FC<PeerCardProp> = ({ data }) => {
  console.log(data)
  return (
    <>
      {data.name && (
        <Card scale>
          <Link href={`user/${data._id}`} passHref>
            <div className="text-sm font-normal flex flex-col items-start justify-around w-[300px] space-y-3 cursor-pointer">
              <div className="flex justify-between items-start w-full">
                <h2 className="text-main-gradient">@{data.name}</h2>
              </div>
              <h3 className="mx-auto text-slate-300 h-[60px] overflow-hidden">
                {data.about}
              </h3>
              <div className="flex items-center">
                {data?.skills?.length !== 0 && (
                  <h4 className="w-[65px] text-center font-light text-slate-300">
                    Skills :
                  </h4>
                )}
                <div className="flex flex-wrap items-center justify-center">
                  {data?.skills?.map((skill: any, index: number) => {
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
              <div className="flex w-full items-center">
                {data?.open_to?.length !== 0 && (
                  <h4 className="w-[65px] text-center font-light text-slate-300">
                    Open to:
                  </h4>
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
      )}
    </>
  );
};

export default PeerCard;
