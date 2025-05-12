export class OfferResponseDto {
  public id!: string;
  public title!: string;
  public description!: string;
  public postDate!: Date;
  public cityName!: string;
  public previewImage!: string;
  public photos!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public rating!: number;
  public housingType!: string;
  public roomsCount!: number;
  public maxGuestsCount!: number;
  public price!: number;
  public goods!: string[];

  public author!: {
    name: string;
    email: string;
    avatarPath: string;
    userType: string;
  };

  public commentsCount!: number;
  public coordinates!: {
    latitude: number;
    longitude: number;
  };
}
