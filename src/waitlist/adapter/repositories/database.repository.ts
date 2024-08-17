import { Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { transformAndValidateSync } from 'class-transformer-validator';
import { random } from 'lodash';
import * as patients from '../../../../sample-data/patients.json';
import { ParameterEntity } from '../../domain/entities/parameter.entity';
import { PatientEntity } from '../../domain/entities/patient.entity';
import { InvalidDatasetException } from '../../domain/exceptions/invalid-dataset.exception';
import { IDatabaseRepository } from '../../domain/interfaces/idatabase.repository';

/**
 * We are using a simple JSON file to store the patient data.
 * In a real-world scenario, you would use a database like MongoDB, PostgreSQL, or MySQL to store the data.
 */
export class DatabaseRepository implements IDatabaseRepository {
  private readonly logger = new Logger(DatabaseRepository.name);

  constructor(private readonly dataset = patients) {}

  public async getPatientWaitlist(): Promise<PatientEntity[]> {
    try {
      const result = transformAndValidateSync(PatientEntity, this.dataset);
      return result;
    } catch {
      this.logger.error("Invalid dataset. Please check the sample data file 'patients.json'.");
      throw new InvalidDatasetException();
    }
  }

  /**
   * We are mocking the parameters that would be stored in a database.
   * @returns
   */
  public async getParameters(): Promise<ParameterEntity> {
    const result = plainToClass(ParameterEntity, {
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

    return result;
  }
}
