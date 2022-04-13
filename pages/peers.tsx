import React, { useEffect, useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import PeerCard from "../components/peerCard";
import { getAllUsers } from "../shared/services/user.services";
import { toast } from "react-toastify";
import EmptyList from "../shared/components/EmptyList";
import { PeerDetailsType } from "../shared/schemas/peerDetails.schema";
import Sidebar from "../components/sidebar";

const Peer: NextPage = () => {
  const [range, setRange] = useState({ from: 1, to: 6 });
  const [peers, setPeers] = useState([]);

  useEffect(() => {
    fetchPeers();
  }, [range]);

  const fetchPeers = async () => {
    try {
      const res = await getAllUsers(range);
      setPeers(res.data);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };
  return (
    <>
      <Sidebar />
      <div className="bg-main-bg text-white min-h-[calc(100vh-60px)] min-w-full flex flex-col items-center">
        <h1 className="text-center w-full text-xl text-main-gradient my-2 ">
          Peers
        </h1>
        <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-2 xl:grid-cols-3 mb-6">
          {peers?.length === 0 ? (
            <>
              <span></span>
              <EmptyList message="No users available" />
            </>
          ) : (
            peers?.map((peer: PeerDetailsType, index: any) => {
              return <PeerCard data={peer} key={index} />;
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Peer;
