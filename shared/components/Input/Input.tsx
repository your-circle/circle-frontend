import React from "react";
import Image from "next/image";

type Props = {
  icon: string;
  type: string;
  name: string;
  key: string;
  onChange: (key: string, value: string) => void;
};

const Input = (props: Props) => {
  return (
    <div className="relative h-[40px]">
      <div className="absolute left-1 z-10 h-[30px] my-[7.5px]">
        <Image src={props.icon} alt={props.name} height={25} width={25} />
      </div>

      <input
        placeholder={props.name}
        type={props.type}
        onChange={(e) => props.onChange(props.name, e.target.value)}
        className="text-black h-full relative pl-9 focus:border-main-purple rounded-sm min-w-[280px]"
      />
    </div>
  );
};

export default Input;
