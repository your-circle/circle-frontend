import type { NextPage } from "next";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Input from "../../shared/components/Input";
import { getUser, editUser } from "../../shared/services/user.services";
import { userContext } from "../../providers/userProvider";
import { toast } from "react-toastify";
import { skillEnum } from "../../shared/config/constants";

const Profile: NextPage = () => {
  useAuth();
  const { user, updateUser } = useContext(userContext);

  type inputType = {
    name: string;
    email: string;
    avatarSeed: String;
    skills: string[];
    about: string;
    github: string;
    linkedin: string;
    twitter: string;
  };
  const defaultInput = {
    name: "",
    email: "",
    avatarSeed: "",
    skills: [],
    about: "",
    github: "",
    linkedin: "",
    twitter: "",
  };
  const [input, setInput] = useState<inputType>(defaultInput);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    fetchUser();
    generateRandomSeed();
    return () => {
      setInput(defaultInput);
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    resetInput();
  }, [user]);

  const resetInput = () => {
    let changes = {};
    for (const [key, value] of Object.entries(user)) {
      changes[key] = value;
    }
    setInput({
      ...input,
      ...changes,
    });
  };

  const fetchUser = async () => {
    try {
      const res = await getUser(user._id);
      updateUser(res.data);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const discardChanges = () => {
    resetInput();
    setIsEditing(false);
  };

  const saveChanges = async () => {
    // validate the input

    // save
    try {
      await editUser(input);
      fetchUser();
      setIsEditing(false);
    } catch (err: any) {
      toast.error(err.message || "something went wrong, try again!");
    }
  };

  const onInputChange = (key: string, value: string) => {
    setInput({
      ...input,
      [key]: value,
    });
  };

  const handleToggle = (skill: string) => {
    const current = [...input.skills];
    const isSelected = current.includes(skill);
    if (!isSelected) {
      setInput({ ...input, skills: [...current, skill] });
      return;
    }
    const index = current.indexOf(skill);
    current.splice(index, 1);
    setInput({ ...input, skills: current });
  };

  const focusInput = () => {
    const input = document.querySelector("#profile-img");
    input && input.click();
  };

  const generateRandomSeed = async () => {
    const randomText = Math.random().toString(36).substring(2, 7);
    onInputChange("avatarSeed", randomText);
  };

  return (
    <>
      <div className="bg-main-bg text-white min-h-screen min-w-full">
        <div className="flex gap-20 items-center py-2 border-b-[2px] mb-4 mx-[45px]">
          <h1 className="h-[27px]">Profile</h1>
          <div
            className="cursor-pointer"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="edit"
          >
            <Image
              src="/images/edit-purple.svg"
              alt="edit"
              height={25}
              width={25}
              onClick={() => setIsEditing(!isEditing)}
            />
          </div>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className={`flex flex-col px-10 mx-2 pb-10 gap-3 ${
            !isEditing ? "pointer-events-none" : ""
          }`}
        >
          <div className="flex items-center gap-4 mb-2">
            <span className="w-[100px]">
              username:<span className="text-red-400">*</span>
            </span>
            <Input
              name="name"
              type="text"
              key="name"
              value={input.name}
              onChange={onInputChange}
            />
          </div>
          <div className="flex items-center gap-4 mb-2">
            <span className="w-[100px]">
              email:<span className="text-red-400">*</span>
            </span>
            <Input
              name="email"
              type="text"
              key="email"
              value={input.email}
              onChange={onInputChange}
            />
          </div>
          <div className="flex items-center gap-4 mb-2">
            <span className="w-[100px]">Bio:</span>
            <Input
              name="about"
              type="textarea"
              key="about"
              value={input.about}
              onChange={onInputChange}
            />
          </div>
          <div className="flex justify-start items-center gap-4 mb-2">
            <span className="w-[100px]">photo:</span>
            <Image
              src={`https://avatars.dicebear.com/api/human/${input.avatarSeed}.svg`}
              alt="profile"
              // onClick={focusInput}
              className="rounded-[50%] bg-white text-black cursor-pointer"
              width={55}
              height={55}
            />
            {/* For Custom Photo - Future Use*/}
            {/* <input
              type="file"
              className="hidden"
              id="profile-img"
              onChange={handleImageChange}
            /> */}
            <Image
              src="/images/loop.svg"
              alt="regenerate"
              width={30}
              height={30}
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="change avatar"
              className="cursor-pointer"
              onClick={generateRandomSeed}
            />
          </div>
          <div className="flex items-center gap-4 mb-2">
            <span className="w-[100px]">skills:</span>
            {/*  multiple */}
            <div className="h-full focus:border-gray-800 rounded-sm w-[400px]">
              <div className="flex gap-2 flex-wrap my-2 bg-white px-3 py-2">
                {input.skills.length !== 0 &&
                  input.skills.map((skill, index) => (
                    <Skill
                      skill={skill}
                      key={index}
                      skills={input.skills}
                      handleToggle={handleToggle}
                    />
                  ))}
                {input.skills.length === 0 && (
                  <span className="text-black opacity-50 select-none">
                    Add your skills here
                  </span>
                )}
              </div>
              <div className="flex gap-2 flex-wrap my-2">
                {skillEnum.map((skill, index) => (
                  <Skill
                    skill={skill}
                    key={index}
                    skills={input.skills}
                    handleToggle={handleToggle}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <span className="w-[100px]">github url:</span>
            <Input
              name="github"
              type="text"
              key="github"
              value={input.github}
              onChange={onInputChange}
              pre="https://github.com/"
            />
          </div>
          <div className="flex items-center gap-4 mb-2">
            <span className="w-[100px]">linkedin url:</span>
            <Input
              name="linkedin"
              type="text"
              key="linkedin"
              value={input.linkedin}
              onChange={onInputChange}
              pre="https://www.linkedin.com/in/"
            />
          </div>
          <div className="flex items-center gap-4 mb-2">
            <span className="w-[100px]">twitter url:</span>
            <Input
              name="twitter"
              type="text"
              key="twitter"
              value={input.twitter}
              onChange={onInputChange}
              pre="https://twitter.com/"
            />
          </div>
          <div className="flex justify-start gap-[10px] pl-[100px] w-max">
            <button
              className="rounded-md bg-main-purple px-4 py-2 disabled:bg-slate-500 min-w-min"
              onClick={discardChanges}
              disabled={!isEditing}
            >
              Discard Changes
            </button>
            <button
              className="rounded-md bg-main-purple px-4 py-2 disabled:bg-slate-500 min-w-min"
              onClick={saveChanges}
              disabled={!isEditing}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const Skill = ({
  skill,
  skills,
  handleToggle,
  isSelected,
}: {
  skill: string;
  skills: string[];
  handleToggle: (skill: string) => void;
  isSelected?: boolean;
}) => {
  const selected = skills.includes(skill);
  if (isSelected && !selected) return null;
  return (
    <div
      className={`flex items-center cursor-pointer hover:scale-105 text-black px-1 text-s ${
        selected ? "bg-[#8080FF]" : "bg-[#d4d4d4]"
      }`}
      onClick={() => handleToggle(skill)}
    >
      <span>{skill}</span>
      <span className="ml-1 pl-1 border-l-2 border-gray-500">
        {selected ? "x" : "+"}
      </span>
    </div>
  );
};

export default Profile;
