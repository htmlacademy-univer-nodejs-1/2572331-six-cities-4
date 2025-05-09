import {UserType} from './user-type.enum.js';

export type User = {
  fullName: string;
  email: string;
  avatarPath: string;
  password: string;
  userType: UserType;
}
