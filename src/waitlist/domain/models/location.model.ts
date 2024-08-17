import { IsDefined, IsLatitude, IsLongitude } from 'class-validator';

export class LocationModel {
  @IsDefined()
  @IsLatitude()
  public latitude: number;

  @IsDefined()
  @IsLongitude()
  public longitude: number;
}
