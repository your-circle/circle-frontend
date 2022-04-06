import React from "react";
import Image from "next/image";

type Props = {
  icon?: string;
  pre?: string;
  type: string;
  name: string;
  key: string;
  value?: string;
  onChange: (key: string, value: string) => void;
};

const Input = (props: Props) => {
  return (
    <div className="relative h-max flex items-center">
      {props.icon && (
        <div className="absolute left-1 z-10 flex items-center justify-center px-2">
          <Image src={props.icon} alt={props.name} height={18} width={18} />
        </div>
      )}
      {props.pre && (
        <span className="h-full px-4 py-2 bg-gray-700">{props.pre}</span>
      )}
      {props.type === "textarea" && (
        <textarea
          placeholder={props.name.charAt(0).toUpperCase() + props.name.slice(1)}
          value={props.value}
          onChange={(e) => props.onChange(props.name, e.target.value)}
          className="text-black h-full relative px-4 py-2 focus:border-main-purple rounded-sm min-w-[280px] resize-none"
          rows={4}
          cols={40}
        />
      )}
      {props.type !== "textarea" && (
        <input
          placeholder={props.name.charAt(0).toUpperCase() + props.name.slice(1)}
          type={props.type}
          value={props.value}
          onChange={(e) => props.onChange(props.name, e.target.value)}
          className={`text-white h-full px-4 py-3 relative ${
            props.icon ? "pl-9" : "pl-4"
          } min-w-[280px] focus:border-gray-800 border-gray-border border placeholder-slate-200 rounded-sm bg-secondary-bg `}
        />
      )}
    </div>
  );
};

export default Input;
