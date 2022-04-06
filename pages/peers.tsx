import React, { useEffect } from "react";
import type { GetServerSideProps, NextPage } from "next";
import PeerCard from "../components/peerCard";
import { getAllUsers } from "../shared/services/user.services";
import { toast } from "react-toastify";
import EmptyList from "../shared/components/EmptyList";
import { PeerDetailsType } from "../shared/schemas/peerDetails.schema";

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
  console.log(props.peers);
  return (
    <>
      <div className="bg-main-bg text-white min-h-[calc(100vh-60px)] min-w-full flex flex-col items-center">
        <h1 className="text-center w-full text-xl text-main-gradient my-2 ">
          Peers
        </h1>
        <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-2 xl:grid-cols-3">
          {props?.peers?.length === 0 ? (
            <>
              <span></span>
              <EmptyList message="No users available" />
            </>
          ) : (
            props?.peers?.map((peer: PeerDetailsType, index: any) => {
              return <PeerCard data={peer} key={index} />;
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Peer;
