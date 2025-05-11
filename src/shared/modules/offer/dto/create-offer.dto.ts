import {Goods, HousingType} from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public cityName: string;
  public previewImage: string;
  public photos: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public housingType: HousingType;
  public roomsCount: number;
  public maxGuestsCount: number;
  public price: number;
  public goods: Goods[];
  public userId: string;
}
