import { AdStatus } from "./ad-status.enum";

export type Ad = {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: AdStatus;
  created_at: string;
  updated_at: string;
  userId: string;
  user: string;
};
