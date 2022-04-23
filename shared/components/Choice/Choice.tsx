import React, { ReactElement } from "react";
import Card from "../Card";

const Choice = ({
  choice,
  selectedChoice,
  handleToggle,
  isSelected,
}: {
  choice: string;
  selectedChoice: string[];
  handleToggle: (choice: string) => void;
  isSelected?: boolean;
}) => {
  const selected = selectedChoice.includes(choice);
  if (isSelected && !selected) return null;
  return (
    <Card scale={false} hoverBorder={true}>
      <div
        className={`flex items-center justify-center w-full h-full cursor-pointe px-1 text-sm ${
          selected ? "text-main-purple" : "text-slate-300"
        }`}
        onClick={() => handleToggle(choice)}
      >
        <span>{choice}</span>
        <span className="ml-1 pl-1 ">{selected ? "x" : "+"}</span>
      </div>
    </Card>
  );
};

export default Choice;
