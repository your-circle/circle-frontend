import { createContext, ReactElement, useState } from "react";

export type userContextType = {
  user: any;
  updateUser: (data: Object) => any;
};

export const userContext = createContext<userContextType>({
  user: {},
  updateUser: () => {},
});

export const UserContextProvider = (props: { children: ReactElement }) => {
  const [user, setUser] = useState<Object>({});
  const updateUser = (data: Object) => {
    setUser(data);
  };

  return <userContext.Provider value={{ user, updateUser }}>{props.children}</userContext.Provider>;
};
