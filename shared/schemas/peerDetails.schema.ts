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

export const skillEnum = [
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

export type openToArray = Array<openToEnum>;
export type openToEnum = "Projects" | "Hackathons" | "Mentoring";
