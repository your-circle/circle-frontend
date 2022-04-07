export type NotificationTypeEnum = "project-join" | "user-info" | "project-add";

export type NotificationCardType = {
  title: string;
  type: NotificationTypeEnum;
  project: string;
  _id: string;
};
