import { createContext, ReactElement, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type userContextType = {
  user: any;
  updateUser: (data: Object) => any;
  isLoggedIn: boolean;
  changeLogInStatus: (state: boolean) => void;
};

export const userContext = createContext<userContextType>({
  user: {},
  updateUser: () => {},
  isLoggedIn: false,
  changeLogInStatus: () => {},
});

export const UserContextProvider = (props: { children: ReactElement }) => {
  const [user, setUser] = useLocalStorage<object>("user", {});
  const updateUser = (data: Object) => {
    setUser(data);
  };
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage<boolean>(
    "isLoggedIn",
    false
  );

  const changeLogInStatus = (state: boolean) => {
    setIsLoggedIn(state);
  };

  return (
    <userContext.Provider
      value={{ user, updateUser, isLoggedIn, changeLogInStatus }}
    >
      {props.children}
    </userContext.Provider>
  );
};
