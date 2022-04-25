import {
  IBodyAuth,
  IBodyChangePassword,
  IBodyReset,
  IChangePasswordResponse,
  ILoginResponse,
  IResetResponse,
} from "@shared/interfaces";

export interface IAuth {
  login: ({ email, password }: IBodyAuth) => Promise<ILoginResponse>;
  reset: ({ email }: IBodyReset) => Promise<IResetResponse>;
  changePassword: ({ password }: IBodyChangePassword, token: string|null) => Promise<IChangePasswordResponse>;
}
