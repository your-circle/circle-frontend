import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { NextPage } from "next";
import useAuth from "../../hooks/useAuth";
import { toastConfig } from "../../shared/config/constants";
import { newProject } from "../../shared/services/projects.services";
import Input from "../../shared/components/Input";
import Card from "../../shared/components/Card";

const NewProject: NextPage = () => {
  useAuth();
  const router = useRouter();

  type inputType = {
    title: string;
    description: string;
    tech: Array<string>;
    need: Array<string>;
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
    need: [],
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
      const res = await newProject({ ...input });
      setPosting(false);
      router.push("/projects");
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
    <div className="flex w-full items-center justify-center text-sm sm:text-md">
      <div className="text-white min-h-screen min-w-full flex flex-col items-center justify-center pt-[58px] mt-[-60px]">
        <Card>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col items-center gap-4 justify-center w-[300px] sm:w-full"
          >
            <span className="text-lg m-4 text-main-gradient">
              Add a new Project
            </span>
            <div className="flex flex-col gap-3 items-center">
              <div className="w-[260px] sm:w-full">
                <Input
                  name="title"
                  type="text"
                  key="title"
                  value={input.title}
                  onChange={onInputChange}
                  transparent={true}
                  fullWidth={true}
                />
              </div>
              <div className="w-[260px] sm:w-full">
                <Input
                  name="description"
                  type="text"
                  key="description"
                  value={input.description}
                  onChange={onInputChange}
                  transparent={true}
                  fullWidth={true}
                />
              </div>
              <div className="flex items-center gap-4 mb-2">
                <div className="h-full focus:border-gray-800 rounded-sm w-[260px] sm:w-[400px]">
                  <div className="flex gap-2 flex-wrap my-2 border-slate-500 rounded-md border px-3 py-1">
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
                      <span className="text-slate-300 py-3 select-none mx-auto">
                        Add Project Type
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
                <div className="h-full focus:border-gray-800 rounded-sm w-[260px] sm:w-[400px]">
                  <div className="flex gap-2 flex-wrap my-2 border-slate-500 rounded-md border px-3 py-1">
                    {input.need.length !== 0 &&
                      input.need.map((tech, index) => (
                        <Choice
                          choice={tech}
                          key={index}
                          selectedChoice={input.need}
                          handleToggle={() => handleToggle(tech, "need")}
                        />
                      ))}
                    {/* placeholder(its like input field to fill the data) */}

                    {input.need.length === 0 && (
                      <span className="text-slate-300 py-3 select-none mx-auto ">
                        Project is looking for
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-center w-full">
                    {allOpenTo.map((tech, index) => (
                      <Choice
                        choice={tech}
                        key={index}
                        selectedChoice={input.need}
                        handleToggle={() => handleToggle(tech, "need")}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button className="rounded-md bg-main-purple px-4 py-3 w-full">
              {posting ? "Adding project to Circle" : "Add Project"}
            </button>
          </form>
        </Card>
      </div>
    </div>
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
    <Card scale={false} hoverBorder={true}>
      <div
        className={`flex items-center justify-center w-full h-full cursor-pointer text-slate-300 px-1 text-sm ${
          selected ? "text-[#8080FF]" : ""
        }`}
        onClick={() => handleToggle(choice)}
      >
        <span>{choice}</span>
        <span className="ml-1 pl-1 ">{selected ? "x" : "+"}</span>
      </div>
    </Card>
  );
};

export default NewProject;
