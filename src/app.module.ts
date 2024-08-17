import { Module } from '@nestjs/common';
import { WaitlistModule } from './waitlist/waitlist.module';

@Module({
  imports: [WaitlistModule],
})
export class AppModule {}
