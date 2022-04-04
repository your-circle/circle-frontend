import { NextPage } from "next/types";
import { PeerDetailsType } from "../../shared/schemas/peerDetails.schema";
import { getAllPeers } from "../../shared/services/peer.services";

type PeersProps = Array<PeerDetailsType>;

const Peers = ({ data }: PeersProps) => {

};

export async function getServerSideProps() {
  const res = await getAllPeers();
  const data = await res.json();
  return { props: { data } };
}

export default Peers;
