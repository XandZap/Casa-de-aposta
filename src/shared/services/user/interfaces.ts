import {
  IUpdateAuth,
  IBodyRegister,
  IRegisterResponse,
  IUpdateResponse,
  IGetUserResponse,
} from "@shared/interfaces";

export interface IUser {
  update: ({ email, name }: IUpdateAuth) => Promise<IUpdateResponse>;
  registerUser: ({ email, password, name }: IBodyRegister) => Promise<IRegisterResponse>;
  getUser: () => Promise<IGetUserResponse>;
}
