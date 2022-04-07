import { skillEnum } from "../config/constants";
export type PeerDetailsType = {
  _id: string;
  name: string;
  about: string;
  email: string;
  discord?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  skills: skillEnumType;
  open_to: openToArray;
  avatarSeed: String;
  projects?: string[];
};

export type skillEnumType = typeof skillEnum;

export type openToArray = Array<openToEnum>;
export type openToEnum = "Projects" | "Hackathons" | "Mentoring";
