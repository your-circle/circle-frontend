import Card from "../../shared/components/Card";

const PeerCard: React.FC = () => {
  return (
    <Card>
      <div className="text-sm font-normal">
        <div className="">@lsd</div>
        <div className="">
          <span>G</span>
          <span>L</span>
          <span>D</span>
          <span>M</span>
        </div>
      </div>
    </Card>
  );
};

export default PeerCard;
