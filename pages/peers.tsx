import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import PeerCard from "../components/peerCard";
import { getAllUsers } from "../shared/services/user.services";
import { toast } from "react-toastify";
import EmptyList from "../shared/components/EmptyList";
import { PeerDetailsType } from "../shared/schemas/peerDetails.schema";
import Sidebar from "../components/sidebar";
import Loading from "../shared/components/Loading";
import { BsSearch } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";

const Peer: NextPage = () => {
  const [filters, setFilters] = useState({
    name: "",
    skills: [],
    open_to: [],
  });
  const [range, setRange] = useState({
    from: 1,
    to: 9,
  });
  const [peers, setPeers] = useState<Array<PeerDetailsType>>([]);
  const [loading, setLoading] = useState(false);
  const [hasMorePeers, setHasMorePeers] = useState<boolean>(true);

  const onTitleChange = (e: any) => {
    setPeers([]);
    setRange({ from: 1, to: 9 });
    setHasMorePeers(true);
    setFilters({
      ...filters,
      name: e.target.value,
    });
  };

  const fetchPeers = async () => {
    try {
      setLoading(true);
      const payload = { ...filters, ...range };
      const res = await getAllUsers(payload);
      const data = res.data || [];
      console.log(data);
      if (data.length < 9) {
        console.log("less than 9");
        console.log(peers);
        setHasMorePeers(false);
        setPeers([...peers, ...data]);
        console.log(peers);
        setLoading(false);
      } else {
        setPeers([...peers, ...data]);
        setRange((range) => ({ from: range.from + 9, to: range.to + 9 }));
        setLoading(false);
      }
    } catch (err: any) {
      setLoading(false);
      console.error(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchPeers();
  }, [filters]);

  return (
    <>
      <Sidebar
        type="PEERS"
        filters={filters}
        setFilters={setFilters}
        setRange={setRange}
        setPeers={setPeers}
        setHasMorePeers={setHasMorePeers}
      />
      <div className="bg-main-bg text-white min-h-[calc(100vh-60px)] min-w-full flex flex-col items-center">
        <h1 className="text-center w-full text-xl text-main-gradient my-2 ">
          Peers
        </h1>
        <div className="my-2 relative">
          <div className="absolute top-3 left-3 z-20 mt-[2px]">
            <BsSearch />
          </div>
          <input
            type="text"
            placeholder="search by username"
            value={filters.name}
            onChange={onTitleChange}
            className="bg-main-gray pl-10 pr-2 pt-2 pb-3 text-l rounded-sm border-[1px] border-gray-600"
          />
        </div>
        <InfiniteScroll
          dataLength={peers.length}
          next={fetchPeers}
          hasMore={hasMorePeers}
          loader={
            <div className="mx-auto w-fit">
              <Loading />
            </div>
          }
          endMessage={
            peers.length !== 0 && (
              <h4 className="text-center mb-4">You Have Seen All</h4>
            )
          }
        >
          <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-2 xl:grid-cols-3 mb-6">
            {peers.length === 0 && !loading ? (
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
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Peer;
