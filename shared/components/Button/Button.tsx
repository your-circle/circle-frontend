import Link from "next/link";
import React, { ReactElement } from "react";

type Props = {
  children: ReactElement | ReactElement[];
  href?: string;
};

const Button = (props: Props) => {
  return (
    <>
      {props.href ? (
        <Link href={props.href} passHref>
          <div className="bg-main-purple flex p-1 items-center justify-center rounded-sm px-2 cursor-pointer ">
            {props.children}
          </div>
        </Link>
      ) : (
        <div className="bg-main-purple flex p-1 items-center justify-center rounded-sm px-2 cursor-pointer">
          {props.children}
        </div>
      )}
    </>
  );
};

export default Button;
