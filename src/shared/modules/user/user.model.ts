import { Schema, Document, model } from 'mongoose';
import {User, UserType} from '../../types/index.js';

export interface UserDocument extends User, Document {
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [1, 'Min length for avatar path is 1'],
    maxlength: [15, 'Max length for avatar path is 15'],
  },
  email: {
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    required: true,
  },
  avatarPath: {
    type: String,
    required: false,
    match: [/^.+(\.jpg|\.png)$/i, 'Avatar path is incorrect'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Min length for avatar path is 6'],
    maxlength: [12, 'Max length for avatar path is 12'],
  },
  userType: {
    type: String,
    required: true,
    enum: Object.values(UserType),
  },
}, { timestamps: true });

export const UserModel = model<UserDocument>('User', userSchema);
