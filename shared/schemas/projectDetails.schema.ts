export type ProjectDetailsType = {
  _id: string;
  title: string;
  creator_id: string;
  creator_name: string;
  description: string;
  projectType: projectTypeArray;
  tech: string[];
  need: needsArray;
  request_list: string[];
  team: object[];
  targetTeamSize: number;
  currentTeamSize: number;
  is_team_full: boolean;
};

export type projectTypeArray = Array<projectTypeEnum>;
export type projectTypeEnum =
  | "Frontend"
  | "Backend"
  | "Fullstack"
  | "UI/UX"
  | "ML"
  | "AppDev"
  | "Blockchain"
  | "Hardware"
  | "Cybersecurity";

export const projectTypeArray = [
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

export type needsArray = Array<needsEnum>;
export type needsEnum = "Developers" | "Mentors";
export const needsArray = ["Developers", "Mentors"];
