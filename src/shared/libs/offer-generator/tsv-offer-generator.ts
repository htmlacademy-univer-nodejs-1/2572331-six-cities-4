import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomBoolean, generateRandomString, generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { getCityCoordinates } from '../../helpers/index.js';

const MIN_RATING = 1;
const MAX_RATING = 5;
const RATING_DECIMAL_PLACES = 1;

const MIN_ROOMS_COUNT = 1;
const MAX_ROOMS_COUNT = 8;

const MIN_GUESTS_COUNT = 1;
const MAX_GUESTS_COUNT = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const cityName = getRandomItem<string>(this.mockData.cityNames);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const photos = getRandomItems<string>(this.mockData.photos).join(';');
    const isPremium = generateRandomBoolean().toString();
    const isFavorite = generateRandomBoolean().toString();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, RATING_DECIMAL_PLACES).toString();
    const housingType = getRandomItem<string>(this.mockData.housingTypes);
    const roomsCount = generateRandomValue(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT).toString();
    const maxGuestsCount = generateRandomValue(MIN_GUESTS_COUNT, MAX_GUESTS_COUNT).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const authorName = getRandomItem<string>(this.mockData.authorNames);
    const email = getRandomItem(this.mockData.authorEmails);
    const avatarPath = getRandomItem(this.mockData.authorAvatarPaths);
    const password = generateRandomString();
    const userType = getRandomItem<string>(this.mockData.userTypes);
    const commentsCount = generateRandomValue(0, 100).toString();
    const coordinates = getCityCoordinates(cityName);

    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    const latitude = coordinates.latitude;
    const longitude = coordinates.longitude;

    return [
      title, description, postDate, cityName,
      previewImage, photos, isPremium, isFavorite, rating,
      housingType, roomsCount, maxGuestsCount, price, goods,
      authorName, email, avatarPath, password, userType,
      commentsCount, latitude, longitude
    ].join('\t');
  }
}
