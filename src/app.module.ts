import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { WaitlistModule } from './waitlist/waitlist.module';

@Module({
  imports: [WaitlistModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
