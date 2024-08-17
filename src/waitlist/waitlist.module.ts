import { Module } from '@nestjs/common';
import { DI_DATABASE_REPOSITORY } from '../configs/container-names';
import { EnvironmentConfig } from '../configs/environment.config';
import { WaitlistHttpController } from './adapter/controllers/waitlist.http.controller';
import { DatabaseRepository } from './adapter/repositories/database.repository';
import { WaitlistService } from './domain/services/waitlist.service';

@Module({
  controllers: [WaitlistHttpController],
  providers: [{ provide: DI_DATABASE_REPOSITORY, useClass: DatabaseRepository }, EnvironmentConfig, WaitlistService],
})
export class WaitlistModule {}
