import React, { useEffect, useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import PeerCard from "../components/peerCard";
import { getAllUsers } from "../shared/services/user.services";
import { toast } from "react-toastify";
import EmptyList from "../shared/components/EmptyList";
import { PeerDetailsType } from "../shared/schemas/peerDetails.schema";
import Sidebar from "../components/sidebar";
import Loading from "../shared/components/Loading";

const Peer: NextPage = () => {
  const [filters, setFilters] = useState({
    from: 1,
    to: 6,
    skills: [],
    open_to: [],
  });
  const [peers, setPeers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPeers();
  }, [filters]);

  const fetchPeers = async () => {
    try {
      setLoading(true);
      const payload = { ...filters };
      const res = await getAllUsers(payload);
      setPeers(res.data);
      setLoading(false);
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../shared/components/Loading";

const Peer: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [range, setRange] = useState({ from: 1, to: 9 });
  const [peers, setPeers] = useState<Array<PeerDetailsType>>([]);
  const [hasMorePeers, setHasMorePeers] = useState<boolean>(true);

  useEffect(() => {
    fetchPeers();
    setLoading(false);
  }, []);

  const fetchPeers = async () => {
    try {
      const res = await getAllUsers(range);
      if (res.data.length === 0) {
        setHasMorePeers(false);
      } else {
        setPeers([...peers, ...res.data]);
        setRange((range) => ({ from: range.from + 9, to: range.to + 9 }));
      }
    } catch (err: any) {
      setLoading(false);
      console.error(err);
      toast.error(err.message);
    }
  };
  return (
    <>
      <Sidebar type="PEERS" filters={filters} setFilters={setFilters} />
      <div className="bg-main-bg text-white min-h-[calc(100vh-60px)] min-w-full flex flex-col items-center">
        <h1 className="text-center w-full text-xl text-main-gradient my-2 ">
          Peers
        </h1>
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-2 xl:grid-cols-3 mb-6">
            {peers?.length === 0 ? (
        <InfiniteScroll
          dataLength={peers.length}
          next={fetchPeers}
          hasMore={hasMorePeers}
          loader={
            <div className="mx-auto w-fit">
              <Loading />
            </div>
          }
          endMessage={<h4 className="text-center mb-4">You Have Seen All</h4>}
        >
          <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-2 xl:grid-cols-3 mb-6">
            {peers?.length === 0 && loading ? (
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
        )}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Peer;
