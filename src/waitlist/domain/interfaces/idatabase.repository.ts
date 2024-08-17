import { ParameterEntity } from '../entity/parameter.entity';
import { PatientEntity } from '../entity/patient.entity';

export interface IDatabaseRepository {
  getParameters(): Promise<ParameterEntity>;
  getPatientWaitlist(): Promise<PatientEntity[]>;
}
