import React from "react";
import Image from "next/image";

type Props = {
  icon?: string;
  pre?: string;
  type: string;
  name: string;
  key: string;
  value: string;
  onChange: (key: string, value: string) => void;
};

const Input = (props: Props) => {
  return (
    <div className="relative h-max">
      {props.icon && (
        <div className="absolute left-1 z-10 py-2 ">
          <Image src={props.icon} alt={props.name} height={25} width={25} />
        </div>
      )}
      {props.pre && (
        <span className="h-full px-4 py-2 bg-gray-700">{props.pre}</span>
      )}
      {props.type === "textarea" && (
        <textarea
          placeholder={props.name}
          value={props.value}
          onChange={(e) => props.onChange(props.name, e.target.value)}
          className="text-black h-full relative px-4 py-2 focus:border-main-purple rounded-sm min-w-[280px] resize-none"
          rows={4}
          cols={40}
        />
      )}
      {props.type !== "textarea" && (
        <input
          placeholder={props.name}
          type={props.type}
          value={props.value}
          onChange={(e) => props.onChange(props.name, e.target.value)}
          className={`text-black h-full px-4 py-3 relative ${
            props.icon ? "pl-9" : "pl-4"
          } min-w-[280px] focus:border-gray-800 rounded-sm`}
        />
      )}
    </div>
  );
};

export default Input;
