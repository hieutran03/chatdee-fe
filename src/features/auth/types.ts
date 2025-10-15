import { ApiResponse } from '@/app/types/api-response.type';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}
export type UserData = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bornYear: number;
  role: UserRole;
};
export type LoginReq = {
  email: string;
  password: string;
};

export type LoginData = {
  accessToken: string;
};

export type LoginRes = ApiResponse<LoginData>;
