import React, { ReactElement } from "react";

type Props = {
  children: ReactElement | ReactElement[];
  scale?: boolean;
  hoverBorder?: boolean;
  border?: boolean;
};

const Card = (props: Props) => {
  return (
    // bg-main-gray border
    <div

      className={`m-2 p-[3px] rounded-md w-max h-full  border  border-gray-border  ${props.scale ? "hover:scale-105" : ""
        } transition-all  ${props.hoverBorder ? "hover:border-slate-300" : ""}
        

        `}
    >
      <div className="flex flex-col justify-between min-h-full rounded-md px-4 py-2 ">
        <>{props.children}</>
      </div>
    </div>
  );
};

export default Card;
