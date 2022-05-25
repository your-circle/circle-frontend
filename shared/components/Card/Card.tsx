import React, { ReactElement, useContext } from "react";
import { themeContext } from "../../../providers/themeProvider";

type Props = {
  children: ReactElement | ReactElement[];
  scale?: boolean;
  hoverBorder?: boolean;
  border?: boolean;
};

const Card = (props: Props) => {
  const { theme } = useContext(themeContext);
  return (
    // bg-main-gray border
    <div
      className={`m-3 p-[3px] cursor-pointer rounded-lg w-max h-full  border  border-gray-border ${
        theme === "light"
          ? "bg-light-theme-bg text-[#202020]"
          : "bg-main-bg text-white"
      }  ${props.scale ? "hover:shadow-3xl " : ""} transition-all  ${
        props.hoverBorder ? "hover:border-slate-300" : ""
      }`}
    >
      <div className="flex flex-col justify-between min-h-full rounded-md px-4 py-2 ">
        <>{props.children}</>
      </div>
    </div>
  );
};

export default Card;
