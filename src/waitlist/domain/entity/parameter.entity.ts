type WeightParameter = {
  percentage: number;
  correlation: number;
};

type WeightParameterConfig = {
  age: WeightParameter;
  distanceToFacility: WeightParameter;
  acceptedOffers: WeightParameter;
  canceledOffers: WeightParameter;
  averageReplyTime: WeightParameter;
};

export class ParameterEntity {
  weightParameter: WeightParameterConfig;
  resultLimitParameter: number;
  usersFromPatientsWithInsufficientBehaviorDataLimit: number;
}
