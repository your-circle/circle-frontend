import { useState } from "react";
import type { NextPage } from "next";
import PeerCard from "../components/peerCard";
import { PeerDetailsType } from "../shared/schemas/peerDetails.schema";

const Peer: NextPage = () => {
  const testProp: PeerDetailsType = {
    userName: "lsd",
    about: "Building things for the web",
    socials: {
      discord: "lsd#5801",
      linkedin: "in/lakshya-dhariwal/",
      twitter: "Lakshya_OnALoop",
      github: "lakshya-dhariwal",
    },
    skills: ["Frontend", "UI/UX"],
    openTo: ["Hackathons", "Projects"],
  };

  const testProp2: PeerDetailsType = {
    userName: "manthan",
    about: "sadak sa utha ke star bana dunga",
    socials: {
      twitter: "Lakshya_OnALoop",
    },
    skills: ["Backend", "Fullstack"],
    openTo: ["Mentoring"],
  };

  const testArray = [testProp, testProp2];
  const [PeerData, setPeerdata] = useState(testArray);

  return (
    <>
      <div className="bg-main-bg text-white min-h-[calc(100vh-60px)] min-w-full">
        <h1 className="text-center w-full text-xl text-main-gradient my-2 ">
          Find Your Peers
        </h1>
        <div className="flex gap-4 py-4 flex-wrap justify-center">
          {PeerData.map((Peer, index) => {
            return <PeerCard data={Peer} key={index} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Peer;
