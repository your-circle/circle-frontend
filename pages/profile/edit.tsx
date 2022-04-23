import type { NextPage } from "next";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Input from "../../shared/components/Input";
import { getUser, editUser } from "../../shared/services/user.services";
import { userContext } from "../../providers/userProvider";
import { toast } from "react-toastify";
import { skillEnum, toastConfig } from "../../shared/config/constants";
import { openToArray } from "../../shared/schemas/peerDetails.schema";
import Card from "../../shared/components/Card";

const Profile: NextPage = () => {
  // useAuth();
  const { user, updateUser } = useContext(userContext);

  type inputType = {
    username: string;
    email: string;
    avatarSeed: String;
    skills: string[];
    open_to: string[];
    about: string;
    github: string;
    linkedin: string;
    twitter: string;
  };
  const defaultInput = {
    username: "",
    email: "",
    avatarSeed: "",
    skills: [],
    open_to: [],
    about: "",
    github: "",
    linkedin: "",
    twitter: "",
  };
  const [input, setInput] = useState<inputType>(defaultInput);
  const [isEditing, setIsEditing] = useState<boolean>(true);

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
    let changes: any = {};
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
    toast.info("Changes Discarded", toastConfig);
  };

  const saveChanges = async () => {
    // validate the input

    // save
    try {
      await editUser(input);
      fetchUser();
      toast.info("Changes Saved", toastConfig);
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

  const handleToggleOpen_to = (skill: string) => {
    const current = [...input.open_to];
    const isSelected = current.includes(skill);
    if (!isSelected) {
      setInput({ ...input, open_to: [...current, skill] });
      return;
    }
    const index = current.indexOf(skill);
    current.splice(index, 1);
    setInput({ ...input, open_to: current });
  };

  const focusInput = () => {
    const input: any = document.querySelector("#profile-img");
    input && input?.click();
  };

  const generateRandomSeed = async () => {
    const randomText = Math.random().toString(36).substring(2, 7);
    onInputChange("avatarSeed", randomText);
  };

  return (
    <div className="flex items-center justify-center mt-2 w-3/4 m-auto">
      {/* <Card> */}
      <div className="text-white w-[360px] sm:w-fit mx-auto">
        <div className="flex gap-20 items-center py-2   mx-[45px] ">
          <h1 className="mx-auto text-2xl my-3 capitalize">
            Editing {user.name}&apos;s Profile
          </h1>
        </div>
        {/* {!isEditing && (
          <div
            className="cursor-pointer flex items-center justify-center border rounded-md border-main-purple mb-6 w-fit px-4 m-auto"
            onClick={() => setIsEditing(true)}
          >
            <Image
              src="/images/edit-purple.svg"
              alt="edit"
              height={25}
              width={25}
            />
            <h2 className="p-3 px-2"> Edit Profile</h2>
          </div>
        )} */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className={`flex flex-col px-10 mx-2 pb-10 gap-3 ${
            !isEditing ? "pointer-events-none" : ""
          }`}
        >
          <div className="flex items-center gap-4 mb-2 justify-between">
            <span className="w-[100px]">Username</span>
            <Input
              name="username"
              type="text"
              key="name"
              value={input.username}
              onChange={onInputChange}
              fullWidth={true}
              transparent={true}
            />
          </div>

          <div className="flex items-center gap-4 mb-2 justify-between">
            <span className="hidden sm:block w-[100px]">Email</span>
            <Input
              name="email"
              type="text"
              key="email"
              value={input.email}
              onChange={onInputChange}
              fullWidth={true}
              transparent={true}
            />
          </div>
          <div className="flex items-center gap-4 mb-2 justify-between">
            <span className="w-[100px]">Bio</span>
            <Input
              transparent={true}
              name="about"
              type="textarea"
              key="about"
              value={input.about}
              fullWidth={true}
              onChange={onInputChange}
            />
          </div>
          {/* <div className="flex justify-start items-center gap-4 mb-2">
              <span className="w-[100px]">Avatar</span>
              <Image
                src={`https://avatars.dicebear.com/api/open-peeps/${input.avatarSeed}.svg`}
                alt="profile"
                // onClick={focusInput}
                className="rounded-[50%] bg-white text-black cursor-pointer"
                width={55}
                height={55}
              />
              {/* For Custom Photo - Future Use*/}
          {/* <input transparent={true}
              type="file"
              className="hidden"
              id="profile-img"
              onChange={handleImageChange}
            /> */}
          {/* <Image
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
        </div> */}
          {/*  multiple */}
          <h2>Skills</h2>
          <div className="h-full focus:border-gray-800 rounded-sm w-full flex flex-col  justify-center items-center">
            <div className="flex gap-2 flex-wrap my-2 border-gray-border border w-full px-3 py-2">
              {input.skills.length !== 0 &&
                input.skills.map((skill: any, index: any) => (
                  <Skill
                    skill={skill}
                    key={index}
                    skills={input.skills}
                    handleToggle={handleToggle}
                  />
                ))}
              {input.skills.length === 0 && (
                <span className="text-slate-200 py2 select-none mx-auto text-gray-500">
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

          <h2>Open to</h2>
          <div className="h-full focus:border-gray-800 rounded-sm w-full flex flex-col  justify-center items-center">
            <div className="flex gap-2 flex-wrap my-2 border-gray-border border w-full px-3 py-2">
              {input.open_to.length !== 0 &&
                input.open_to.map((skill: any, index: any) => (
                  <Skill
                    skill={skill}
                    key={index}
                    skills={input.open_to}
                    handleToggle={handleToggleOpen_to}
                  />
                ))}
              {input.open_to.length === 0 && (
                <span className="text-slate-200 py2 select-none mx-auto text-gray-500">
                  Add your open to here
                </span>
              )}
            </div>
            <div className="flex gap-2 flex-wrap my-2">
              {openToArray.map((skill, index) => (
                <Skill
                  skill={skill}
                  key={index}
                  skills={input.open_to}
                  handleToggle={handleToggleOpen_to}
                />
              ))}
            </div>
          </div>
          <h2>Links</h2>
          <div className="flex items-center gap-4 mb-2">
            <span>https://github.com/</span>
            <Input
              transparent={true}
              name="github"
              type="text"
              key="github"
              value={input.github}
              onChange={onInputChange}
              fullWidth={true}
            />
          </div>
          <div className="flex items-center gap-4 mb-2">
            <span>https://www.linkedin.com/in/</span>
            <Input
              transparent={true}
              name="linkedin"
              type="text"
              key="linkedin"
              value={input.linkedin}
              onChange={onInputChange}
              fullWidth={true}
            />
          </div>
          <div className="flex items-center gap-4 mb-2">
            <span>https://twitter.com/</span>
            <Input
              transparent={true}
              name="twitter"
              type="text"
              key="twitter"
              value={input.twitter}
              onChange={onInputChange}
              fullWidth={true}
            />
          </div>
          <div className="flex justify-center items-center w-full gap-[10px]">
            <button
              className="rounded-md bg-blue-500 py-2 disabled:bg-slate-500 w-1/2"
              onClick={discardChanges}
            >
              Discard Changes
            </button>
            <button
              className="rounded-md bg-blue-500  py-2 disabled:bg-slate-500 w-1/2"
              onClick={saveChanges}
            >
              Save
            </button>
          </div>
        </form>
      </div>
      {/* </Card > */}
    </div>
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
    <Card scale={false} hoverBorder={true}>
      <div
        className={`flex items-center cursor-pointer px-1 text-s  ${
          selected ? "text-main-purple" : "text-slate-200"
        }`}
        onClick={() => handleToggle(skill)}
      >
        <span>{skill}</span>
        <span className="ml-1 pl-1  border-gray-500">
          {selected ? "x" : "+"}
        </span>
      </div>
    </Card>
  );
};

export default Profile;
