import { TestBed } from '@automock/jest';
import { describe, expect, it } from '@jest/globals';
import { plainToClass } from 'class-transformer';
import { random } from 'lodash';
import * as sampleData from '../../../../sample-data/patients.json';
import { DI_DATABASE_REPOSITORY } from '../../../configs/container-names';
import { ParameterEntity } from '../entities/parameter.entity';
import { PatientEntity } from '../entities/patient.entity';
import { IDatabaseRepository } from '../interfaces/idatabase.repository';
import { PatientResponseModel } from '../models/patient-response.model';
import { WaitlistService } from './waitlist.service';

function mockParameterEntity() {
  return plainToClass(ParameterEntity, {
    resultLimitParameter: 10,
    usersFromPatientsWithInsufficientBehaviorDataLimit: random(0, 10),
    weightParameter: {
      age: { percentage: 10, correlation: 0 }, //  10% Weight
      distanceToFacility: { percentage: 10, correlation: 1 }, //  10% Weight
      acceptedOffers: { percentage: 30, correlation: 0 }, //  30% Weight
      canceledOffers: { percentage: 30, correlation: 1 }, //  30% Weight
      averageReplyTime: { percentage: 20, correlation: 1 }, //  20% Weight
    },
  });
}

describe(WaitlistService.name, () => {
  let sut: WaitlistService;
  let databaseRepository: jest.Mocked<IDatabaseRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(WaitlistService).compile();

    sut = unit;
    databaseRepository = unitRef.get(DI_DATABASE_REPOSITORY);
  });

  it('should return a list of 10 PatientResponseModel instances when given valid coordinates', async () => {
    //  Arrange
    const mockDataset: PatientEntity[] = sampleData.map((row) => plainToClass(PatientEntity, row));
    databaseRepository.getParameters.mockResolvedValueOnce(mockParameterEntity());
    databaseRepository.getPatientWaitlist.mockResolvedValueOnce(mockDataset);

    //  Act
    const actual = await sut.getWaitlist({ latitude: 48.712, longitude: -60.117 });

    //  Assert
    expect(actual).toHaveLength(10);
    expect(actual[0]).toBeInstanceOf(PatientResponseModel);
  });

  it('should return a list of 15 PatientResponseModel instances when resultLimitParameter is set to 15', async () => {
    //  Arrange
    const mockDataset: PatientEntity[] = sampleData.map((row) => plainToClass(PatientEntity, row));
    const mockParameter = mockParameterEntity();
    mockParameter.resultLimitParameter = 15;

    databaseRepository.getParameters.mockResolvedValueOnce(mockParameter);
    databaseRepository.getPatientWaitlist.mockResolvedValueOnce(mockDataset);

    //  Act
    const actual = await sut.getWaitlist({ latitude: 48.712, longitude: -60.117 });

    //  Assert
    expect(actual).toHaveLength(15);
    expect(actual[0]).toBeInstanceOf(PatientResponseModel);
  });

  it('should return a list of PatientResponseModel instances including 3 with insufficient behavior data when limit is set to 3', async () => {
    //  Arrange
    const mockDataset: PatientEntity[] = sampleData.map((row) => plainToClass(PatientEntity, row));
    const mockParameter = mockParameterEntity();
    mockParameter.usersFromPatientsWithInsufficientBehaviorDataLimit = 3;

    databaseRepository.getParameters.mockResolvedValueOnce(mockParameter);
    databaseRepository.getPatientWaitlist.mockResolvedValueOnce(mockDataset);

    //  Act
    const actual = await sut.getWaitlist({ latitude: 48.712, longitude: -60.117 });

    //  Assert
    expect(actual[0]).toBeInstanceOf(PatientResponseModel);

    //  These are the 7 patients with Higher Score
    expect(actual[0]).toMatchObject({ name: 'Tamara Roberts', score: 8.841_299_772_195_864 });
    expect(actual[1]).toMatchObject({ name: 'Adeline Corwin', score: 8.795_227_701_156_842 });
    expect(actual[2]).toMatchObject({ name: 'Miss Frida Harris', score: 8.504_282_050_048_07 });
    expect(actual[3]).toMatchObject({ name: 'Laurine Kshlerin', score: 8.266_908_346_750_974 });
    expect(actual[4]).toMatchObject({ name: 'Jess Deckow', score: 8.202_908_194_187_078 });
    expect(actual[5]).toMatchObject({ name: 'Ms. Damien Ziemann', score: 8.128_320_806_106_737 });
    expect(actual[6]).toMatchObject({ name: 'Mrs. Jaquan Lemke', score: 8.121_941_754_496_556 });

    //  These are the 3 patients with insufficient behavior data
    expect(actual[7]).toMatchObject({ name: 'Dina Orn', score: 5.353_516_530_659_789 });
    expect(actual[8]).toMatchObject({ name: 'Etha Bauch', score: 5.171_177_089_515_895 });
    expect(actual[9]).toMatchObject({ name: 'Arnold Krajcik', score: 4.297_176_493_591_225 });
  });
});
