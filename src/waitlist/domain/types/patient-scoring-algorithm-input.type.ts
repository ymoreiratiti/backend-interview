import { PatientEntity } from '../entities/patient.entity';
import type { WeightParameterConfig } from './config.type';

export type PatientScoringAlgorithmInput = {
  dataset: PatientEntity[];
  weightParameter?: WeightParameterConfig;
  resultLimitParameter?: number;
  usersFromPatientsWithInsufficientBehaviorDataLimit?: number;
};
