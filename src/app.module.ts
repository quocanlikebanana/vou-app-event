import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { InfraModule } from './infra/infra.module';
import { ReaderModule } from './reader/reader.module';
import { ConfigModule } from '@nestjs/config';
import configuration, { ConfigurationService } from './utils/configuration';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    EventModule,
    InfraModule,
    ReaderModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigurationService,
  ],
})
export class AppModule { }
