import { IsDefined, IsLatitude, IsLongitude } from 'class-validator';

export class CoordinatesDto {
  @IsLatitude()
  @IsDefined()
  latitude: number;

  @IsLongitude()
  @IsDefined()
  longitude: number;
}
