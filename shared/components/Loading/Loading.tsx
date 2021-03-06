import Image from "next/image";
const Loading: React.FC = () => {
  return (
    <>
      <Image
        src="/images/loading.svg"
        layout="fixed"
        width="30"
        height="30"
        className="animate-spin"
      />
    </>
  );
};

export default Loading;
