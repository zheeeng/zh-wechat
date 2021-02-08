import { Module } from '@nestjs/common';
import { WxModule } from './wx/wx.module';
import { LogModule } from './log/log.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogRecord, Archive } from './log/log.entity';
import { Connection } from 'typeorm';
import { MYSQL } from './constants';
import { ScheduleModule } from '@nestjs/schedule';
import { User } from './auth/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: MYSQL.TYPE,
      host: MYSQL.HOST,
      port: MYSQL.PORT,
      username: MYSQL.USERNAME,
      password: MYSQL.PASSWORD,
      database: MYSQL.DATABASE,
      entities: [LogRecord, Archive, User],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    WxModule,
    LogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
