import { Coordinates, Goods, HousingType, Offer, User, UserType } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    createdDate,
    cityName,
    previewImage,
    photos,
    isPremium,
    isFavorite,
    rating,
    housingType,
    roomsCount,
    maxGuestsCount,
    price,
    goods,
    authorName,
    authorEmail,
    authorAvatarPath,
    authorPassword,
    authorUserType,
    commentsCount,
    latitude,
    longitude
  ] = offerData.replace('\n', '').split('\t');

  const author: User = {
    fullName: authorName,
    email: authorEmail,
    avatarPath: authorAvatarPath,
    password: authorPassword,
    userType: UserType[authorUserType as 'Common' | 'Pro']
  };

  const coordinates: Coordinates = {
    latitude: +latitude,
    longitude: +longitude
  };

  return {
    title: title,
    description: description,
    postDate: new Date(createdDate),
    cityName: cityName,
    previewImage: previewImage,
    photos: photos.split(';'),
    isPremium: JSON.parse(isPremium),
    isFavorite: JSON.parse(isFavorite),
    rating: +rating,
    housingType: HousingType[housingType as 'Apartment' | 'House' | 'Room' | 'Hotel'],
    roomsCount: Number.parseInt(roomsCount, 10),
    maxGuestsCount: Number.parseInt(maxGuestsCount, 10),
    price: Number.parseInt(price, 10),
    goods: goods.split(';')
      .map((goodsElement) => (Goods[goodsElement as 'Breakfast' | 'AirConditioning' | 'LaptopFriendlyWorkspace' | 'BabySeat' | 'Washer' | 'Towels' | 'Fridge'])),
    author: author,
    commentsCount: Number.parseInt(commentsCount, 10),
    coordinates: coordinates
  };
}
