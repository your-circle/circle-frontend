import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { NextPage } from "next";
import useAuth from "../../hooks/useAuth";
import { toastConfig } from "../../shared/config/constants";
import { newProject } from "../../shared/services/projects.services";
import Input from "../../shared/components/Input";
import Card from "../../shared/components/Card";
import Choice from "../../shared/components/Choice/Choice";

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
    "Frontend",
    "Backend",
    "Fullstack",
    "UI/UX",
    "ML",
    "AppDev",
    "Blockchain",
    "Hardware",
    "Cybersecurity",
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

  const handleSubmit = async (e: any) => {
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
    <div className="flex w-full items-center justify-center text-sm sm:text-md mb-6">
      <div className="text-white min-h-screen min-w-full flex flex-col items-center justify-center ">
        {/* <Card> */}
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col items-center gap-4 justify-center w-[300px] sm:w-1/2"
        >
          <span className="text-lg m-4 text-main-gradient">
            Add a new Project
          </span>
          <div className="flex flex-col gap-3 items-start">
            <H2 title="Title of Project"></H2>
            <div className="w-[260px] sm:w-full">

              <Input
                name="Enter title"
                type="text"
                key="title"
                value={input.title}
                onChange={onInputChange}
                transparent={true}
                fullWidth={true}
              />
            </div>
            <H2 title="Description of Project"></H2>
            <div className="w-[260px] sm:w-full">
              <Input
                name="Enter description"
                type="textarea"
                key="description"
                value={input.description}
                onChange={onInputChange}
                transparent={true}
                fullWidth={true}
              />
            </div>

            <H2 title="Tech of Project"></H2>
            <div className="flex items-center gap-4 mb-2">
              <div className=" focus:border-gray-800 rounded-sm">
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
                    <span className="text-slate-300 py-3 select-none mx-auto w-full text-center">
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

            <H2 title="Need of Project"></H2>
            <div className="flex items-center gap-4 mb-2 w-full">
              {/*  multiple */}
              <div className="focus:border-gray-800 rounded-sm w-full">
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
                    <span className="text-slate-300 py-3 select-none mx-auto  w-full text-center ">
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
        {/* </Card> */}
      </div>
    </div>
  );
};


const H2: React.FC<{ title: string }> = (props) => {
  return <h2 className="ml-1 mt-2 text-sm">{props.title}</h2>
}



export default NewProject;
