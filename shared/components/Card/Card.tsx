import React, { ReactElement } from "react";

type Props = {
  children: ReactElement | ReactElement[];
};

const Card = (props: Props) => {
  return (
    <div className="m-2 border-[3px] rounded-md w-max px-4 py-2 border-main-border bg-secondary-bg">
      <>{props.children}</>
    </div>
  );
};

export default Card;
