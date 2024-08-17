import { PatientEntity } from '../entities/patient.entity';

export type PatientFacilityModel = {
  distanceToFacility?: number;

  totalOffers?: number;

  ageNormalize?: number;
  distanceToFacilityNormalize?: number;
  acceptedOffersNormalize?: number;
  canceledOffersNormalize?: number;
  averageReplyTimeNormalize?: number;

  score?: number;
} & PatientEntity;
