import React, { useContext } from "react";
import Image from "next/image";
import { themeContext } from "../../../providers/themeProvider";

type Props = {
  icon?: string;
  pre?: string;
  type: string;
  name: string;
  key: string;
  value?: string;
  transparent?: boolean;
  fullWidth?: boolean;
  auth?: boolean;
  onChange: (key: string, value: string) => void;
};

const Input = (props: Props) => {
  const { theme } = useContext(themeContext);
  return (
    <div
      className={`relative h-max flex items-center ${
        (props.type == "text" || props.type === "textarea") &&
        "flex-1 justify-end"
      } ${theme === "light" ? "text-black" : "text-white"}`}
    >
      {props.icon && (
        <div className="absolute left-1 z-10 flex items-center justify-center px-2">
          <Image src={props.icon} alt={props.name} height={18} width={18} />
        </div>
      )}
      {props.pre && (
        <span
          className={`h-full pl-3 pr-2 py-2  ${
            props.transparent
              ? ""
              : theme === "light"
              ? "bg-white"
              : "bg-gray-700"
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
          } h-full relative px-4 py-2 focus:border-main-purple rounded-sm min-w-[280px] resize-none text-white placeholder-gray-500
            ${props.fullWidth ? "w-full" : "min-w-[280px]"}
            ${theme === "light" ? "text-black" : "text-white"}`}
          rows={4}
          cols={40}
        />
      )}
      {props.type !== "textarea" && (
        <input
          placeholder={props.name.charAt(0).toUpperCase() + props.name.slice(1)}
          type={props.type}
          value={props.value}
          autoComplete="chrome-off"
          onChange={(e) => props.onChange(props.name, e.target.value)}
          className={`placeholder-capitalize h-full px-4 py-3 relative focus:border-gray-800 placeholder-gray-500 border-gray-border border rounded-sm 
                      ${props.icon ? "pl-9" : "pl-4"}  
                     ${
                       props.transparent
                         ? "bg-transparent"
                         : theme === "light"
                         ? "bg-white"
                         : "bg-gray-700"
                     } 
                     ${props.fullWidth ? "w-full" : "min-w-[280px]"}
                      `}
        />
      )}
    </div>
  );
};

export default Input;
