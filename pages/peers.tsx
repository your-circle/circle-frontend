import React, { useEffect } from "react";
import type { GetServerSideProps, NextPage } from "next";
import PeerCard from "../components/peerCard";
import { getAllUsers } from "../shared/services/user.services";
import { toast } from "react-toastify";
import EmptyList from "../shared/components/EmptyList";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // api call
  let peers;
  try {
    peers = await getAllUsers();
  } catch (err: any) {
    console.error(err);
    toast.error(err.message);
  }
  return {
    props: { peers: peers?.data || [] },
  };
};

const Peer: NextPage = (props: any) => {
  const peers = props.peers.data;
  return (
    <>
      <div className="bg-main-bg text-white min-h-[calc(100vh-60px)] min-w-full flex flex-col items-center">
        <h1 className="text-center w-full text-xl text-main-gradient my-2 ">
          Peers
        </h1>
        <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-2 xl:grid-cols-3">
          {peers.length === 0 ? (
            <EmptyList message="No users available" />
          ) : (
            peers.map((peer: any, index: number) => {
              return <PeerCard data={peer} key={index} />;
            })
          )}
        </div>
      </div>
    </>
  );
};
