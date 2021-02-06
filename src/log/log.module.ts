import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogRecord, Archive } from './log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogRecord, Archive])],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
