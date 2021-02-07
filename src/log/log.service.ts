import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { LogRecord, Archive } from './log.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(LogRecord) private recordsRepository: Repository<LogRecord>,
    @InjectRepository(Archive) private archivesRepository: Repository<Archive>,
  ) {}

  log(ip: string) {
    return  this.recordsRepository.insert(LogRecord.fromIp(ip, false))
  }

  logPoster(ip: string) {
    return this.recordsRepository.insert(LogRecord.fromIp(ip, true))
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async archive() {
    const records = await this.recordsRepository.find()
    await this.archivesRepository.insert(Archive.fromRecords(records))
    return this.recordsRepository.remove(records)
  }

  async getArchives(days: number) {
    const startDayAgo = Math.min(30, days)
    const todayTime = new Date().setHours(0, 0, 0, 0)
    const startFrom = todayTime - startDayAgo * 3600 * 24 * 1000
    const archived = await this.archivesRepository.find({
      where: {
        date: Between(new Date(startFrom), new Date(todayTime))
      }
    })
    const todayGenerated = await this.recordsRepository.find()

    const todayStatistic = Archive.statisticRecords(todayGenerated)
    const historyStatistic = Archive.statisticArchives(archived)
    const archives:typeof historyStatistic = {
      ...historyStatistic,
      [todayTime]: todayStatistic
    }
    
    return archives
  }
}
