import Image from "next/image";
import React from "react";

type Props = {
  message?: string;
};

const EmptyList = (props: Props) => {
  return (
    <div className="flex flex-col gap-4 items-center my-10">
      <Image
        src="/images/open-box.svg"
        alt="empty list"
        height={100}
        width={100}
      />
      <div className="w-full text-center">{props.message || "Empty List"}</div>
    </div>
  );
};

export default EmptyList;
