import { Module } from '@nestjs/common';
import { EnvironmentConfig } from '../configs/environment.config';
import { WaitlistHttpController } from './adapter/controller/waitlist.http.controller';
import { WaitlistService } from './domain/service/waitlist.service';

@Module({
  controllers: [WaitlistHttpController],
  providers: [WaitlistService, EnvironmentConfig],
})
export class WaitlistModule {}
