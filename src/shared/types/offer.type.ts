import {HousingType} from './housing-type.enum.js';
import {Goods} from './goods.enum.js';
import {User} from './user.type.js';
import {Coordinates} from './coordinates.type.js';

export type Offer = {
  id: string;
  title: string;
  description: string;
  postDate: Date;
  cityName: string;
  previewImage: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  roomsCount: number;
  maxGuestsCount: number;
  price: number;
  goods: Goods[];
  author: User;
  commentsCount: number;
  coordinates: Coordinates;
}
