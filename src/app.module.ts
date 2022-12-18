import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersModule } from './infrastructure/controllers/controllers.module';

@Module({
  imports: [ControllersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
