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
        <div className="text-sm font-normal flex flex-col items-start justify-around w-[300px] space-y-3 cursor-pointer">
          <div className="flex justify-between items-start w-full">
            <h2 className="text-main-gradient">@{data.name}</h2>
            <div className="flex  justify-between space-x-2">
              {data?.discord ? (
                <a
                  rel="noreferrer"
                  href={`https://discordapp.com/users/`}
                  target="_blank"
                >
                  <Image
                    className="cursor-pointer"
                    src="/images/socials/discord.svg"
                    alt="discord"
                    layout="fixed"
                    height="15"
                    width="15"
                  />
                </a>
              ) : (
                ""
              )}
              {data?.github ? (
                <a
                  rel="noreferrer"
                  href={`https://www.github.com/${data.github}`}
                  target="_blank"
                >
                  <Image
                    className="cursor-pointer"
                    src="/images/socials/github.svg"
                    alt="github"
                    layout="fixed"
                    height="15"
                    width="15"
                  />
                </a>
              ) : (
                ""
              )}
              {data?.twitter ? (
                <a
                  rel="noreferrer"
                  href={`https://www.twitter.com/${data.twitter}`}
                  target="_blank"
                >
                  <Image
                    className="cursor-pointer"
                    src="/images/socials/twitter.svg"
                    alt="twitter"
                    layout="fixed"
                    height="15"
                    width="15"
                  />
                </a>
              ) : (
                ""
              )}
              {data?.linkedin ? (
                <a
                  rel="noreferrer"
                  href={`https://www.linkedin.com/${data.linkedin}`}
                  target="_blank"
                >
                  <Image
                    className="cursor-pointer"
                    src="/images/socials/linkedin.svg"
                    alt="linkedin"
                    layout="fixed"
                    height="15"
                    width="15"
                  />
                </a>
              ) : (
                ""
              )}
            </div>
          </div>
          <h3 className="mx-auto text-slate-300 h-[60px] overflow-hidden">
            {data.about}
          </h3>
          <div className="flex items-center">
            <h4 className="w-[65px] text-center font-light text-slate-300">
              Skills :
            </h4>
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
              {data?.skills?.length === 0 && (
                <span className="px-2 m-0.5 rounded-sm font-extralight bg-gradient text-neutral-800 ">
                  Not mentioned
                </span>
              )}
            </div>
          </div>
          <div className="flex w-full items-center">
            <h4 className="w-[65px] text-center font-light text-slate-300">
              Open to:
            </h4>
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
              {data?.open_to?.length === 0 && (
                <span className="px-2 m-0.5 rounded-sm font-extralight bg-gradient text-neutral-800 ">
                  Not mentioned
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default PeerCard;
