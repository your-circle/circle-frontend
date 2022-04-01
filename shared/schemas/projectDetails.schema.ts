export type ProjectDetailsType = {
  title: string;
  creator: string;
  description: string;
  projectType: projectTypeArray;
  tech: string[];
  needs: needsArray;
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
