import { Role } from "./role.enum";

export type User = {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  role: Role;
};
