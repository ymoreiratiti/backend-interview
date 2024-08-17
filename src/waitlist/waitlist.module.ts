import { Module } from '@nestjs/common';
import { WaitlistController } from './adapter/controller/waitlist.controller';
import { WaitlistService } from './domain/service/waitlist.service';

@Module({
  controllers: [WaitlistController],
  providers: [WaitlistService],
})
export class WaitlistModule {}
