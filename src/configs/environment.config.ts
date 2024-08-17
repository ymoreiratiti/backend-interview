import { get } from 'env-var';

export class EnvironmentConfig {
  port = get('PORT').default(3000).asPortNumber();
  enableSwagger = get('ENABLE_SWAGGER').default('TRUE').asBool();
}

export const environmentConfig = new EnvironmentConfig();
