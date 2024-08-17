import { ParameterEntity } from '../entities/parameter.entity';
import { PatientEntity } from '../entities/patient.entity';

export interface IDatabaseRepository {
  getParameters(): Promise<ParameterEntity>;
  getPatientWaitlist(): Promise<PatientEntity[]>;
}
