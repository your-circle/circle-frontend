import React, { ReactElement } from "react";

type Props = {
  children: ReactElement | ReactElement[];
};

const Card = (props: Props) => {
  return (
    <div className="m-2 p-[3px] rounded-md w-max h-max bg-gradient-to-br from-[#7362D1] to-[#618EB0] backdrop-filter backdrop-blur-lg hover:scale-105 transition-all">
      <div className="flex flex-col justify-between h-full bg-secondary-bg rounded-md px-4 py-2">
        <>{props.children}</>
      </div>
    </div>
  );
};

export default Card;
