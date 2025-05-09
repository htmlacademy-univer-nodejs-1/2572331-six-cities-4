import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Coordinates, Goods, HousingType } from '../../types/index.js';
import { UserEntity } from '../user/index.js';
import {getCityCoordinates} from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true, minlength: 10, maxlength: 100 })
  public title!: string;

  @prop({ trim: true, required: true, minlength: 10, maxlength: 100 })
  public description!: string;

  @prop({ required: true })
  public postDate!: Date;

  @prop({ required: true })
  public cityName!: string;

  @prop({ required: true })
  public previewImage!: string;

  @prop({ required: true })
  public photos!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true })
  public isFavorite!: boolean;

  @prop({ required: true, min: 1, max: 5 })
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
    enum: HousingType
  })
  public housingType!: HousingType;

  @prop({ required: true, min: 1, max: 8 })
  public roomsCount!: number;

  @prop({ required: true, min: 1, max: 10 })
  public maxGuestsCount!: number;

  @prop({ required: true, min: 100, max: 100000 })
  public price!: number;

  @prop({
    required: true,
    type: () => String,
    enum: HousingType
  })
  public goods!: Goods[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({ default: 0 })
  public commentsCount: number;

  @prop({ required: true })
  public coordinates: Coordinates;

  public setCoordinates() {
    this.coordinates = getCityCoordinates(this.cityName);
  }

  public getCoordinates() {
    return this.coordinates;
  }
}

export const OfferModel = getModelForClass(OfferEntity);
