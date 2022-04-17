import React from "react";
import Image from "next/image";

type Props = {
  icon?: string;
  pre?: string;
  type: string;
  name: string;
  key: string;
  value?: string;
  transparent?: boolean;
  fullWidth?: boolean;
  onChange: (key: string, value: string) => void;
};

const Input = (props: Props) => {
  return (
    <div
      className={`relative h-max flex items-center ${
        (props.type == "text" || props.type === "textarea") &&
        "flex-1 justify-end"
      }`}
    >
      {props.icon && (
        <div className="absolute left-1 z-10 flex items-center justify-center px-2">
          <Image src={props.icon} alt={props.name} height={18} width={18} />
        </div>
      )}
      {props.pre && (
        <span
          className={`h-full pl-3 pr-2 py-2  ${
            props.transparent ? "" : "bg-gray-700"
          }`}
        >
          {props.pre}
        </span>
      )}
      {props.type === "textarea" && (
        <textarea
          placeholder={props.name.charAt(0).toUpperCase() + props.name.slice(1)}
          value={props.value}
          onChange={(e) => props.onChange(props.name, e.target.value)}
          className={`${
            props.transparent
              ? "bg-transparent border-gray-border border"
              : "bg-secondary-bg"
          } h-full relative px-4 py-2 focus:border-main-purple rounded-sm min-w-[280px] resize-none text-white
            ${props.fullWidth ? "w-full" : "min-w-[280px]"}
            `}
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
          className={`text-white h-full px-4 py-3 relative focus:border-gray-800 border-gray-border border placeholder-slate-200 rounded-sm 
                      ${props.icon ? "pl-9" : "pl-4"}  
                     ${
                       props.transparent ? "bg-transparent" : "bg-secondary-bg"
                     } 
                     ${props.fullWidth ? "w-full" : "min-w-[280px]"}  
                      `}
        />
      )}
    </div>
  );
};

export default Input;
