export type PeerDetailsType = {
  _id: string;
  name: string;
  userName: string;
  about: string;
  discord?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  skills: skillEnum;
  open_to: openToArray;
};

export type skillEnum = [
  "Frontend",
  "Backend",
  "Fullstack",
  "UI/UX",
  "ML",
  "AppDev",
  "Blockchain",
  "Hardware",
  "Cybersecurity"
];

export type openToArray = Array<openToEnum>;
export type openToEnum = "Projects" | "Hackathons" | "Mentoring";
