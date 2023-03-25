import { createContext, useState, ReactNode } from "react";

import { IUserInfo } from "@/interfaces/authInterface";

export interface IUserContext {
  userInfos: IUserInfo
  setUserInfos: (newState: IUserInfo) => void;
}

const bodyInitalValue: IUserInfo = {
  id: 0,
  firstName: "",
  token: "",
}

const initialValue: IUserContext = {
  userInfos: bodyInitalValue,
  setUserInfos: () => {}
}

const UserContext = createContext(initialValue)
export default UserContext

interface IUserContextProps {
  children: ReactNode
}

export function UserProvider({ children }: IUserContextProps) {
  const [userInfos, setUserInfos] = useState<IUserInfo>(initialValue.userInfos)

  return (
    <UserContext.Provider value={{ userInfos, setUserInfos}}>
      { children }
    </UserContext.Provider>
  )
}