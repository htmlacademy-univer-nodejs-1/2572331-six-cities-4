import {defaultClasses, getModelForClass, prop} from '@typegoose/typegoose';
import {User, UserType} from '../../types/index.js';

export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true, minlength: 1, maxlength: 15 })
  public name: string;

  @prop({ unique: true, required: true, match: /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/ })
  public email: string;

  @prop({ required: false, default: '' })
  public avatarPath: string;

  @prop({ required: true, minlength: 6, maxlength: 12 })
  public password: string;

  @prop({ required: true, enum: UserType })
  public userType: UserType;
}

export const UserModel = getModelForClass(UserEntity);
