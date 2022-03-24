import Card from "../../shared/components/Card";
import { PeerDetailsType } from "../../shared/schemas/peerDetails.schema";
import Image from "next/image";

type PeerCardProp = {
  data: PeerDetailsType;
};
const PeerCard: React.FC<PeerCardProp> = ({ data }) => {
  return (
    <Card>
      <div className="text-sm font-normal flex flex-col items-start justify-around w-[300px] space-y-3 cursor-default">
        <div className="flex justify-between items-start w-full">
          <h2 className="text-main-gradient">@{data.userName}</h2>
          <div className="flex  justify-between space-x-2">
            {data.socials.discord ? (
              <a href={`https://discordapp.com/users/`} target="_blank">
                <Image
                  className="cursor-pointer"
                  src="/images/socials/discord.svg"
                  layout="fixed"
                  height="15"
                  width="15"
                />
              </a>
            ) : (
              ""
            )}
            {data.socials.github ? (
              <a
                href={`https://www.github.com/${data.socials.github}`}
                target="_blank"
              >
                <Image
                  className="cursor-pointer"
                  src="/images/socials/github.svg"
                  layout="fixed"
                  height="15"
                  width="15"
                />
              </a>
            ) : (
              ""
            )}
            {data.socials.twitter ? (
              <a
                href={`https://www.twitter.com/${data.socials.twitter}`}
                target="_blank"
              >
                <Image
                  className="cursor-pointer"
                  src="/images/socials/twitter.svg"
                  layout="fixed"
                  height="15"
                  width="15"
                />
              </a>
            ) : (
              ""
            )}
            {data.socials.linkedin ? (
              <a
                href={`https://www.linkedin.com/${data.socials.linkedin}`}
                target="_blank"
              >
                <Image
                  className="cursor-pointer"
                  src="/images/socials/linkedin.svg"
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
        <h3 className="mx-auto text-slate-300">{data.about}</h3>
        <div className="flex items-center">
          <h4 className="w-[65px] text-center font-light text-slate-300">
            Skills :
          </h4>
          <div className="flex flex-wrap items-center justify-center">
            {data.skills.map((skill) => {
              return (
                <span className="px-2 m-0.5 rounded-full font-extralight bg-gradient text-neutral-800">
                  {skill}
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex items-center">
          <h4 className="w-[65px] text-center font-light text-slate-300">
            Open to :
          </h4>
          <div className="flex flex-wrap items-center justify-center">
            {data.openTo.map((item) => {
              return (
                <span className="px-2 m-0.5 rounded-full font-extralight bg-gradient text-neutral-800">
                  {item}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PeerCard;
