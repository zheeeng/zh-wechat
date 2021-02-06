import { Controller, Get, Ip, Query } from '@nestjs/common';
import { LogService } from './log.service';
@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  logPv(@Ip() ip: string) {
    this.logService.log(ip);
  }

  @Get('poster')
  logPoster(@Ip() ip: string) {
    this.logService.logPoster(ip);
  }

  archive() {
    this.logService.archive()
  }

  @Get('statistic')
  getStatistic (@Query('days') days: number) {
    return this.logService.getArchives(days)
  }
}
