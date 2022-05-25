import Image from "next/image";
import React, { useContext } from "react";
import { themeContext } from "../../../providers/themeProvider";

type Props = {
  message?: string;
};

const EmptyList = (props: Props) => {
  const { theme } = useContext(themeContext);
  return (
    <div className="flex flex-col gap-4 items-center my-10">
      <Image
        src="/images/open-box.svg"
        alt="empty list"
        height={100}
        width={100}
        className="text-black"
      />
      <div className="w-full text-center">{props.message || "Empty List"}</div>
    </div>
  );
};

export default EmptyList;
