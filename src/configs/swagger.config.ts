import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('backend-interview')
  .setVersion('1.0.0')
  .addTag('waitlist')
  .build();
