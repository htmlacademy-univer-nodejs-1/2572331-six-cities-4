import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {User, UserType} from '../../types/index.js';
import {createSHA256} from '../../helpers/index.js';
import {CreateUserDto} from './dto/create-user.dto.js';
import {OfferEntity} from '../offer/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true, minlength: 1, maxlength: 15, default: '', type: () => String })
  public name: string;

  @prop({ unique: true, required: true, match: /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, type: () => String })
  public email: string;

  @prop({ required: false, default: '', type: () => String })
  public avatarPath: string;

  @prop({ required: true, default: '', type: () => String })
  public password: string;

  @prop({ required: true, enum: UserType, type: () => String })
  public userType: UserType;

  @prop({
    ref: OfferEntity,
    default: [],
    type: () => [String]
  })
  public favorites: Ref<OfferEntity>[];

  constructor(userData: CreateUserDto) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.userType = userData.userType;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
