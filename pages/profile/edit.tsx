import type { NextPage } from "next";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Input from "../../shared/components/Input";
import { getUser, editUser } from "../../shared/services/user.services";
import { userContext } from "../../providers/userProvider";
import { toast } from "react-toastify";
import { skillEnum } from "../../shared/config/constants";
import Card from "../../shared/components/Card";

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
  const [input, setInput] = useState<Type>(defaultInput);
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
    <div className="flex items-center justify-center">
      <Card>
        <div className="text-white min-h-full w-[360px] sm:w-fit">
          <div className="flex gap-20 items-center py-2   mx-[45px] ">
            <h1 className="mx-auto text-lg text-main-gradient">Your Profile</h1>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className={`flex flex-col px-10 mx-2 pb-10 gap-3 ${
              !isEditing ? "pointer-events-none" : ""
            }`}
          >
            <div className="flex items-center gap-4 mb-2">
              <span className="w-[100px]">
                Username<span className="text-red-400">*</span>
              </span>
              <Input
                name="name"
                type="text"
                key="name"
                value={input.name}
                onChange={onInputChange}
                transparent={true}
              />
            </div>

            <div className="flex items-center gap-4 mb-2">
              <span className="hidden sm:block w-[100px]">
                Email<span className="text-red-400">*</span>
              </span>
              <Input
                name="email"
                type="text"
                key="email"
                value={input.email}
                onChange={onInputChange}
                transparent={true}
              />
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="w-[100px]">Bio</span>
              <Input
                transparent={true}
                name="about"
                type="textarea"
                key="about"
                value={input.about}
                onChange={onInputChange}
              />
            </div>
            <div className="flex justify-start items-center gap-4 mb-2">
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
            {/*  multiple */}
            <div className="h-full focus:border-gray-800 rounded-sm w-full flex flex-col  justify-center items-center">
              <div className="flex gap-2 flex-wrap my-2 border-gray-border border w-full px-3 py-2">
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
                  <span className="text-slate-200 py2 select-none mx-auto">
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
            <div className="flex items-center gap-4 mb-2">
              <Input
                transparent={true}
                name="github"
                type="text"
                key="github"
                value={input.github}
                onChange={onInputChange}
                pre="https://github.com/"
              />
            </div>
            <div className="flex items-center gap-4 mb-2">
              <Input
                transparent={true}
                name="linkedin"
                type="text"
                key="linkedin"
                value={input.linkedin}
                onChange={onInputChange}
                pre="https://www.linkedin.com/in/"
              />
            </div>
            <div className="flex items-center gap-4 mb-2">
              <Input
                transparent={true}
                name="twitter"
                type="text"
                key="twitter"
                value={input.twitter}
                onChange={onInputChange}
                pre="https://twitter.com/"
              />
            </div>

            <div className="flex justify-center items-center w-full gap-[10px] pl-[100px] ">
              <button
                className="rounded-md bg-main-purple py-2 disabled:bg-slate-500 w-1/2"
                onClick={discardChanges}
                disabled={!isEditing}
              >
                Discard Changes
              </button>
              <button
                className="rounded-md bg-main-purple  py-2 disabled:bg-slate-500 w-1/2"
                onClick={saveChanges}
                disabled={!isEditing}
              >
                Save
              </button>
            </div>
          </form>
          <div
            className="cursor-pointer flex items-center justify-center border rounded-md border-main-purple"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="edit"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Image
              src="/images/edit-purple.svg"
              alt="edit"
              height={25}
              width={25}
            />
            <h2 className="p-3 px-2"> Edit Profile</h2>
          </div>
        </div>
      </Card>
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
          selected ? "text-[#8080FF]" : "text-slate-200"
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
