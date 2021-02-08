import { Controller, Get, Ip, Query, UseGuards, Post } from '@nestjs/common';
import { LogService } from './log.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
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

  @UseGuards(JwtAuthGuard)
  @Post('archive')
  archive() {
    this.logService.archive();
  }

  @UseGuards(JwtAuthGuard)
  @Get('statistic')
  getStatistic(@Query('days') days: number) {
    return this.logService.getArchives(days);
  }
}
