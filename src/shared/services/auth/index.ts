import {
  IBodyAuth,
  ILoginResponse,
  IBodyReset,
  IResetResponse,
  IBodyChangePassword,
  IChangePasswordResponse,
} from "@shared/interfaces";
import instance from "../axios.config";
import { IAuth } from "./interfaces";

const authServices = (): IAuth => {
  async function login(body: IBodyAuth): Promise<ILoginResponse> {
    return instance.post("/login", body);
  }
  async function reset(body: IBodyReset): Promise<IResetResponse> {
    return instance.post("/reset", body);
  }

  async function changePassword(body: IBodyChangePassword, token: string|null): Promise<IChangePasswordResponse> {
    return instance.post(`/reset/${token}`, body);
  }

  return { login, reset, changePassword };
};

export default authServices;
