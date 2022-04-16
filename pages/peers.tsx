import React, { useEffect, useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import PeerCard from "../components/peerCard";
import { getAllUsers } from "../shared/services/user.services";
import { toast } from "react-toastify";
import EmptyList from "../shared/components/EmptyList";
import { PeerDetailsType } from "../shared/schemas/peerDetails.schema";
import Sidebar from "../components/sidebar";
import Loading from "../shared/components/Loading";
import { BsSearch } from "react-icons/bs";

const Peer: NextPage = () => {
  const [filters, setFilters] = useState({
    from: 1,
    to: 6,
    name: "",
    skills: [],
    open_to: [],
  });
  const [peers, setPeers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPeers();
  }, [filters]);

  const onTitleChange = (e: any) => {
    setFilters({
      ...filters,
      name: e,
    });
  };

  const fetchPeers = async () => {
    try {
      setLoading(true);
      const payload = { ...filters };
      const res = await getAllUsers(payload);
      setPeers(res.data);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.error(err);
      toast.error(err.message);
    }
  };
  return (
    <>
      <Sidebar type="PEERS" filters={filters} setFilters={setFilters} onTitleChange={onTitleChange} />
      <div className="bg-main-bg text-white min-h-[calc(100vh-60px)] min-w-full flex flex-col items-center">
        {/* <h1 className="text-center w-full text-xl text-main-gradient my-2 ">
          Peers
<<<<<<< HEAD
        </h1> */}

        {/* <div className="my-2 relative">
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
        </div> */}

        {loading ? (
          <Loading />
        ) : (
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
        )}
      </div>
    </>
  );
};

export default Peer;
