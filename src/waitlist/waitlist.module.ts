import { Module } from '@nestjs/common';
import { DI_DATABASE_REPOSITORY } from '../configs/container-names';
import { EnvironmentConfig } from '../configs/environment.config';
import { WaitlistHttpController } from './adapter/controller/waitlist.http.controller';
import { DatabaseRepository } from './adapter/repository/database.repository';
import { WaitlistService } from './domain/service/waitlist.service';

@Module({
  controllers: [WaitlistHttpController],
  providers: [{ provide: DI_DATABASE_REPOSITORY, useClass: DatabaseRepository }, EnvironmentConfig, WaitlistService],
})
export class WaitlistModule {}
