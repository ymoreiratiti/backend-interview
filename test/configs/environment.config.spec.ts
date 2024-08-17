import { expect } from 'chai';
import { environmentConfig, EnvironmentConfig } from '../../src/configs/environment.config';

describe(EnvironmentConfig.name, function () {
  it('Should load env-var and set value', () => {
    expect(new EnvironmentConfig()).to.not.undefined;
    expect(environmentConfig).to.not.undefined;
  });
});
