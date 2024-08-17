import { TestBed } from '@automock/jest';
import { ParameterEntity } from '../../domain/entities/parameter.entity';
import { PatientEntity } from '../../domain/entities/patient.entity';
import { InvalidDatasetException } from '../../domain/exceptions/invalid-dataset.exception';
import { DatabaseRepository } from './database.repository';

describe(DatabaseRepository.name, () => {
  let sut: DatabaseRepository;

  beforeEach(async () => {
    const { unit } = TestBed.create(DatabaseRepository).compile();

    sut = unit;
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('getPatientWaitlist', () => {
    it('should return a list of patients', async () => {
      //  Act
      const actual = await sut.getPatientWaitlist();

      //  Assert
      expect(actual).toBeDefined();
      expect(actual).toHaveLength(1000);
      expect(actual[0]).toBeInstanceOf(PatientEntity);
      expect(actual[0].id).toBe('541d25c9-9500-4265-8967-240f44ecf723');
    });

    it('should throw an error if dataset is invalid', async () => {
      //  Arrange
      const invalidEntity = {
        id: 'Any UniqId',
        name: 'Any User',
        location: { latitude: '123456789', longitude: '987654321' },
        age: 1500,
        acceptedOffers: -10,
        canceledOffers: -12,
        averageReplyTime: -10,
      };
      sut = new DatabaseRepository([invalidEntity]);

      //  Act
      let actual, error;
      try {
        actual = await sut.getPatientWaitlist();
      } catch (error_) {
        error = error_;
      }

      //  Assert
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(InvalidDatasetException);
      expect(actual).not.toBeDefined();
    });
  });

  describe('getParameters', () => {
    it('should return a list of parameters', async () => {
      //  Act
      const actual = await sut.getParameters();

      //  Assert
      expect(actual).toBeDefined();
      expect(actual).toBeInstanceOf(ParameterEntity);
      expect(actual).toMatchObject({
        resultLimitParameter: 10,
        usersFromPatientsWithInsufficientBehaviorDataLimit: expect.any(Number),
        weightParameter: {
          age: { percentage: 10, correlation: 0 },
          distanceToFacility: { percentage: 10, correlation: 1 },
          acceptedOffers: { percentage: 30, correlation: 0 },
          canceledOffers: { percentage: 30, correlation: 1 },
          averageReplyTime: { percentage: 20, correlation: 1 },
        },
      });
    });
  });
});
