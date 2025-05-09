import { Schema, Document, model } from 'mongoose';
import {User, UserType} from '../../types/index.js';

export interface UserDocument extends User, Document {}

const userSchema = new Schema({
  fullName: String,
  email: String,
  avatarPath: String,
  password: String,
  userType: UserType,
});

export const UserModel = model<UserDocument>('User', userSchema);
