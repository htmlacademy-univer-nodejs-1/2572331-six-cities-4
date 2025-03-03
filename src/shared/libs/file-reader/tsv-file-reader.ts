import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import {Goods, HousingType, Offer, UserType} from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([offerId, title, description, createdDate, cityName, previewImage, photos, isPremium, isFavorite, rating,
        housingType, roomsCount, maxGuestsCount, price, goods, authorId, authorName, authorEmail,
        authorAvatarPath, authorPassword, authorUserType, commentsCount, latitude, longitude]) => ({
        id: offerId,
        title: title,
        description: description,
        postDate: new Date(createdDate),
        cityName: cityName,
        previewImage: previewImage,
        photos: photos.split(';'),
        isPremium: JSON.parse(isPremium),
        isFavorite: JSON.parse(isFavorite),
        rating: Number.parseInt(rating, 10),
        housingType: HousingType[housingType as 'Apartment' | 'House' | 'Room' | 'Hotel'],
        roomsCount: Number.parseInt(roomsCount, 10),
        maxGuestsCount: Number.parseInt(maxGuestsCount, 10),
        price: Number.parseInt(price, 10),
        goods: goods.split(';')
          .map((goodsElement) => (Goods[goodsElement as 'Breakfast' | 'AirConditioning' | 'LaptopFriendlyWorkspace' | 'BabySeat' | 'Washer' | 'Towels' | 'Fridge'])),
        author: {
          id: authorId,
          fullName: authorName,
          email: authorEmail,
          avatarPath: authorAvatarPath,
          password: authorPassword,
          userType: UserType[authorUserType as 'Common' | 'Pro']
        },
        commentsCount: Number.parseInt(commentsCount, 10),
        coordinates: {
          latitude: Number.parseInt(latitude, 10),
          longitude: Number.parseInt(longitude, 10)
        }
      }));
  }
}
