import { NextRouter } from "next/router";

export interface ISignUp {
  email: string;
  firstName: string;
  surname: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginProps {
  data: ILogin;
  userInfos: IUserInfo;
  setUserInfos: (newState: IUserInfo) => void;
  router: NextRouter;
}

export interface IUserInfo {
  id: number | string | null | undefined;
  firstName: string | null | undefined;
  token: string | null | undefined;
}

export interface Iuser {
  userInfos: IUserInfo
}