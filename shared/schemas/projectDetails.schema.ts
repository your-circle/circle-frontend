export type ProjectDetailsType = {
  _id: string;
  title: string;
  creator_name: string;
  creator_id: string;
  description: string;
  projectType: projectTypeArray;
  tech: string[];
  need: needsArray;
  targetTeamSize: number;
  currentTeamSize: number;
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

export type needsArray = Array<needsEnum>;
export type needsEnum = "Developers" | "Mentors";
