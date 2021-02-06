import { Module } from '@nestjs/common';
import { WxModule } from './wx/wx.module';
import { LogModule } from './log/log.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogRecord, Archive } from './log/log.entity';
import { Connection } from 'typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [LogRecord, Archive],
      synchronize: true,
    }),
    WxModule, LogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
