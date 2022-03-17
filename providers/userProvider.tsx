import { createContext, ReactElement, useState } from "react";

export type userContextType = {
  user: any;
  updateUser: (data: Object) => any;
  isLoggedIn: boolean;
  changeLogInStatus: () => any;
};

export const userContext = createContext<userContextType>({
  user: {},
  updateUser: () => {},
  isLoggedIn: true,
  changeLogInStatus: () => {},
});

export const UserContextProvider = (props: { children: ReactElement }) => {
  const [user, setUser] = useState<Object>({});
  const updateUser = (data: Object) => {
    setUser(data);
  };
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const changeLogInStatus = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <userContext.Provider value={{ user, updateUser, isLoggedIn, changeLogInStatus }}>
      {props.children}
    </userContext.Provider>
  );
};
