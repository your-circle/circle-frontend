import React, { ReactElement } from "react";

type Props = {
  children: ReactElement | ReactElement[];
};

const Button = (props: Props) => {
  return (
    <div className="bg-main-purple flex p-1 items-center justify-center rounded-sm px-2 cursor-pointer ">
      {props.children}
    </div>
  );
};

export default Button;
