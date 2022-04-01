import React, { useState } from "react";
import { newPost } from "../../api/post";
import { toast } from "react-toastify";
import { toastConfig } from "../../shared/constants";
import { useRouter } from "next/router";
import { NextPage } from "next";
import useAuth from "../../hooks/useAuth";

const NewProject: NextPage = () => {
  const router = useRouter();

  type inputType = {
    title: string;
    description: string;
    tech: Array<string>;
    open_to: Array<string>;
  };

  const allTech: Array<string> = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Redux",
    "Node",
  ];
  const allOpenTo: Array<string> = ["Mentor", "Developers"];
  // new post state
  const [input, setInput] = useState<inputType>({
    title: "",
    description: "",
    tech: [],
    open_to: [],
  });

  const [posting, setPosting] = useState<boolean>(false);

  // input change handler
  const onInputChange = (name: string, value: string) => {
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPosting(true);
    // data validation
    try {
      const res = await newPost({ ...input });
      setPosting(false);
      router.push("/");
    } catch (err: any) {
      setPosting(false);
      toast.error(err.message, toastConfig);
      console.error(err?.message || "something went wrong, try again!");
    }
  };

  const handleToggle = (element: string, inputField: string) => {
    const current = [...input[inputField]];
    const isSelected = current.includes(element);
    if (!isSelected) {
      setInput({ ...input, [inputField]: [...current, element] });
      return;
    }
    const index = current.indexOf(element);
    current.splice(index, 1);
    setInput({ ...input, [inputField]: current });
  };

  return (
    <>
      <div className="bg-main-bg text-white min-h-screen min-w-full flex flex-col items-center justify-center pt-[58px] mt-[-60px]">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-lg">New Project</span>
          <input
            name="title"
            type="text"
            key="title"
            placeholder="title"
            value={input.title}
            onChange={(e) => onInputChange(e.target.name, e.target.value)}
            required
          />
          <input
            name="description"
            type="text"
            key="description"
            placeholder="description"
            value={input.description}
            onChange={(e) => onInputChange(e.target.name, e.target.value)}
            required
          />

          <div className="flex items-center gap-4 mb-2">
            <div className="h-full focus:border-gray-800 rounded-sm w-[400px]">
              <div className="flex gap-2 flex-wrap my-2 bg-white px-3 py-2">
                {input.tech.length !== 0 &&
                  input.tech.map((tech, index) => (
                    <Choice
                      choice={tech}
                      key={index}
                      selectedChoice={input.tech}
                      handleToggle={() => handleToggle(tech, "tech")}
                    />
                  ))}
                {/* placeholder(its like input field to fill the data) */}
                {input.tech.length === 0 && (
                  <span className="text-black opacity-50 select-none">
                    Technology
                  </span>
                )}
              </div>
              <div className="flex gap-2 flex-wrap my-2">
                {allTech.map((tech, index) => (
                  <Choice
                    choice={tech}
                    key={index}
                    selectedChoice={input.tech}
                    handleToggle={() => handleToggle(tech, "tech")}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* OPEN TO */}
          <div className="flex items-center gap-4 mb-2">
            {/*  multiple */}
            <div className="h-full focus:border-gray-800 rounded-sm w-[400px]">
              <div className="flex gap-2 flex-wrap my-2 bg-white px-3 py-2">
                {input.open_to.length !== 0 &&
                  input.open_to.map((tech, index) => (
                    <Choice
                      choice={tech}
                      key={index}
                      selectedChoice={input.open_to}
                      handleToggle={() => handleToggle(tech, "openTo")}
                    />
                  ))}
                {/* placeholder(its like input field to fill the data) */}
                {input.open_to.length === 0 && (
                  <span className="text-black opacity-50 select-none">
                    Open To
                  </span>
                )}
              </div>
              <div className="flex gap-2 flex-wrap my-2">
                {allOpenTo.map((tech, index) => (
                  <Choice
                    choice={tech}
                    key={index}
                    selectedChoice={input.open_to}
                    handleToggle={() => handleToggle(tech, "open_to")}
                  />
                ))}
              </div>
            </div>
          </div>

          <button className="rounded-md bg-main-purple px-4 py-2">
            {posting ? "Posting" : "Post"}
          </button>
        </form>
      </div>
    </>
  );
};

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
    <div
      className={`flex items-center cursor-pointer hover:scale-105 text-black px-1 text-s ${
        selected ? "bg-[#8080FF]" : "bg-[#d4d4d4]"
      }`}
      onClick={() => handleToggle(choice)}
    >
      <span>{choice}</span>
      <span className="ml-1 pl-1 border-l-2 border-gray-500">
        {selected ? "x" : "+"}
      </span>
    </div>
  );
};

export default NewProject;
