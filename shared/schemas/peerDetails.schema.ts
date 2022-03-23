export type PeerDetailsType = {
  userName: string;
  about: string;
  socials: {
    discord?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  skills: skillArray;
  openTo: openToArray;
};

export type skillArray = Array<skillEnum>;
export type skillEnum =
  | "Frontend"
  | "Backend"
  | "Fullstack"
  | "UI/UX"
  | "ML"
  | "AppDev"
  | "Blockchain"
  | "Hardware"
  | "Cybersecurity";

export type openToArray = Array<openToEnum>;
export type openToEnum = "Projects" | "Hackathons" | "Mentoring";
