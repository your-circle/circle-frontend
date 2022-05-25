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
        src={
          theme === "light"
            ? "/images/open-box-light.svg"
            : "/images/open-box.svg"
        }
        alt="empty list"
        height={100}
        width={100}
      />
      <div
        className={`w-full text-center ${
          theme === "light" ? "text-black" : "text-white"
        } text-black`}
      >
        {props.message || "Empty List"}
      </div>
    </div>
  );
};

export default EmptyList;
