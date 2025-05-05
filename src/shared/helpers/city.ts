import { CITIES } from '../modules/city/city.constant.js';
import { Coordinates } from '../types/index.js';

export function getCityCoordinates(cityName: string): Coordinates {
  return CITIES[cityName];
}
