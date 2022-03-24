import { useState } from "react";
import type { NextPage } from "next";
import PeerCard from "../components/peerCard";

const Peer: NextPage = () => {
  const [PeerData, setPeerdata] = useState(["a"]);
  return (
    <>
      <div className="bg-main-bg  text-white min-h-screen min-w-full">
        <h1 className="">Peer</h1>
        <div className="">
          {PeerData.map((Peer) => {
            return <PeerCard />;
          })}
        </div>
      </div>
    </>
  );
};

export default Peer;
