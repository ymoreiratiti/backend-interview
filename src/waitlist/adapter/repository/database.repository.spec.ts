import { TestBed } from '@automock/jest';
import { PatientEntity } from '../../domain/entity/patient.entity';
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
  });
});
