import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Coordinates, Goods, HousingType } from '../../types/index.js';
import { UserEntity } from '../user/index.js';
import {getCityCoordinates} from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true, minlength: 10, maxlength: 100, type: () => String })
  public title!: string;

  @prop({ trim: true, required: true, minlength: 10, maxlength: 100, type: () => String })
  public description!: string;

  @prop({ required: true, type: () => Date })
  public postDate!: Date;

  @prop({ required: true, type: () => String })
  public cityName!: string;

  @prop({ required: true, type: () => String })
  public previewImage!: string;

  @prop({ required: true, type: () => [String] })
  public photos!: string[];

  @prop({ required: true, type: () => Boolean })
  public isPremium!: boolean;

  @prop({ required: true, type: () => Boolean })
  public isFavorite!: boolean;

  @prop({ required: true, min: 1, max: 5, type: () => Number })
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
    enum: HousingType
  })
  public housingType!: HousingType;

  @prop({ required: true, min: 1, max: 8, type: () => Number })
  public roomsCount!: number;

  @prop({ required: true, min: 1, max: 10, type: () => Number })
  public maxGuestsCount!: number;

  @prop({ required: true, min: 100, max: 100000, type: () => Number })
  public price!: number;

  @prop({
    required: true,
    type: () => [String],
    enum: Goods
  })
  public goods!: Goods[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({ default: 0, type: () => Number })
  public commentsCount: number;

  @prop({ required: true, default: '', type: Object })
  public coordinates: Coordinates;

  public setCoordinates() {
    this.coordinates = getCityCoordinates(this.cityName);
  }

  public getCoordinates() {
    return this.coordinates;
  }
}

export const OfferModel = getModelForClass(OfferEntity);
