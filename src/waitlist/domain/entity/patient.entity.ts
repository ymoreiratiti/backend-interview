import { Type } from 'class-transformer';
import { IsDefined, IsNumber, IsString, IsUUID, Max, Min, ValidateNested } from 'class-validator';
import 'reflect-metadata';
import { LocationModel } from '../models/location.model';

export class PatientEntity {
  @IsDefined()
  @IsUUID()
  id: string;

  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => LocationModel)
  location: LocationModel;

  @IsDefined()
  @Min(0)
  @Max(122) //  https://en.wikipedia.org/wiki/List_of_the_verified_oldest_people
  @IsNumber()
  age: number;

  @IsDefined()
  @Min(0)
  @IsNumber()
  acceptedOffers: number;

  @IsDefined()
  @Min(0)
  @IsNumber()
  canceledOffers: number;

  @IsDefined()
  @Min(0)
  @IsNumber()
  averageReplyTime: number;
}
