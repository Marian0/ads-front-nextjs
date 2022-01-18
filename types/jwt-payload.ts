import { Role } from "./role.enum";

export type JWTPayload = {
  email: string;
  role: Role;
  iat: number;
  exp: number;
};
