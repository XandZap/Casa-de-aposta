import {
  IBodyRegister,
  IGetUserResponse,
  IRegisterResponse,
  IUpdateAuth,
  IUpdateResponse,
} from "@shared/interfaces";
import instance from "../axios.config";
import { IUser } from "./interfaces";

const userServices = (): IUser => {
  async function update(body: IUpdateAuth): Promise<IUpdateResponse> {
    return instance.post("/user/update", body);
  }

  async function registerUser(body: IBodyRegister): Promise<IRegisterResponse> {
    return instance.post("/user/create", body);
  }

  async function getUser(): Promise<IGetUserResponse> {
    return instance.get("/user/my-account");
  }

  return { update, registerUser, getUser };
};

export default userServices;
