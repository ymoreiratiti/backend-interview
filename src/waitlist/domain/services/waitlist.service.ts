import { Inject, Injectable, Scope } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import * as _ from 'lodash';
import { DI_DATABASE_REPOSITORY } from '../../../configs/container-names';
import { ParameterEntity } from '../entities/parameter.entity';
import { calculateWeight } from '../helpers/calculate-weight.helper';
import { distanceBetweenCoordinates } from '../helpers/distance-between-coordinates.helper';
import { getDatasetMinMaxValues } from '../helpers/get-dataset-min-max-values.helper';
import { Normalization } from '../helpers/normalization.helper';
import { IDatabaseRepository } from '../interfaces/idatabase.repository';
import { LocationModel } from '../models/location.model';
import { PatientResponseModel } from '../models/patient-response.model';
import { DatasetMinMaxValues } from '../types/dataset-min-max-values.type';
import { type PatientFacilityModel } from '../types/patient-facility.type';

@Injectable({ scope: Scope.REQUEST })
export class WaitlistService {
  private dataset: PatientFacilityModel[];
  private parameters: ParameterEntity;
  private datasetMinMaxValues!: DatasetMinMaxValues;

  constructor(@Inject(DI_DATABASE_REPOSITORY) private readonly databaseRepository: IDatabaseRepository) {}

  async getWaitlist(facilityLocation: LocationModel): Promise<PatientResponseModel[]> {
    //  Validate location before use it
    facilityLocation = plainToClass(LocationModel, facilityLocation);

    await this.loadDatabase();
    this.enrichPatientData(facilityLocation);
    this.normalizeValues();
    this.calculateScore();

    return this.prioritizeUsersWithLimitedData();
  }

  private async loadDatabase() {
    this.dataset = await this.databaseRepository.getPatientWaitlist();
    this.parameters = await this.databaseRepository.getParameters();
  }

  /**
   * Enrich patient metadata values.
   * @param facilityLocation
   */
  private enrichPatientData(facilityLocation: LocationModel) {
    for (const patient of this.dataset) {
      patient.totalOffers = patient.acceptedOffers + patient.canceledOffers;
      patient.distanceToFacility = distanceBetweenCoordinates(patient.location, facilityLocation);
    }
  }

  /**
   * In order to compare values with different scales, we need to normalize them (Put them in a scale from 0 to 1)
   * Reference: https://www.codecademy.com/article/normalization
   */
  private normalizeValues() {
    this.datasetMinMaxValues = getDatasetMinMaxValues(this.dataset);

    for (const patient of this.dataset) {
      patient.ageNormalize = Normalization.minMaxNormalize(patient.age, this.datasetMinMaxValues.age);
      patient.distanceToFacilityNormalize = Normalization.minMaxNormalize(
        patient.distanceToFacility!,
        this.datasetMinMaxValues.distanceToFacility,
      );
      patient.acceptedOffersNormalize = Normalization.minMaxNormalize(
        patient.acceptedOffers,
        this.datasetMinMaxValues.acceptedOffers,
      );
      patient.canceledOffersNormalize = Normalization.minMaxNormalize(
        patient.canceledOffers,
        this.datasetMinMaxValues.canceledOffers,
      );
      patient.averageReplyTimeNormalize = Normalization.minMaxNormalize(
        patient.averageReplyTime,
        this.datasetMinMaxValues.averageReplyTime,
      );
    }
  }

  /**
   * Apply the weight to each normalized value of each pacient
   */
  private calculateScore() {
    //  Calculate the score for each patient
    for (const patient of this.dataset) {
      const score: number =
        0 +
        calculateWeight(patient.ageNormalize!, this.parameters.weightParameter.age) +
        calculateWeight(patient.distanceToFacilityNormalize!, this.parameters.weightParameter.distanceToFacility) +
        calculateWeight(patient.acceptedOffersNormalize!, this.parameters.weightParameter.acceptedOffers) +
        calculateWeight(patient.canceledOffersNormalize!, this.parameters.weightParameter.canceledOffers) +
        calculateWeight(patient.averageReplyTimeNormalize!, this.parameters.weightParameter.averageReplyTime);

      patient.score = score / 10;
    }
  }

  /**
   * Prioritizes users with limited behavior data and combines them with users having the best scores.
   * This method sorts the dataset to identify users with the fewest behavior data points and users with the highest scores.
   * It then combines these two lists, ensuring the total number of users does not exceed the specified result limit.
   * @returns
   */
  private prioritizeUsersWithLimitedData(): PatientResponseModel[] {
    //  Sort the dataset to identify users with the fewer behavior data points
    const insufficientBehaviorDataList: PatientFacilityModel[] = this.dataset
      .sort((a, b) => a.totalOffers! - b.totalOffers!)
      .slice(0, this.parameters.usersFromPatientsWithInsufficientBehaviorDataLimit);

    //  Sort the dataset to identify users with the highest scores
    const scoreList = this.dataset.sort((a, b) => b.score! - a.score!).slice(0, this.parameters.resultLimitParameter);

    return _([...insufficientBehaviorDataList, ...scoreList])
      .uniqBy('id')
      .slice(0, this.parameters.resultLimitParameter)
      .sort((a, b) => b.score! - a.score!)
      .map((row) => plainToClass(PatientResponseModel, row))
      .value();
  }
}
