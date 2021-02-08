import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { WxService } from './wx.service';

@Controller('wx')
export class WxController {
  constructor(private readonly wxService: WxService) {}

  @Get()
  getConfig(@Query('url') url: string) {
    if (!url) throw new BadRequestException();
    return this.wxService.getConfig(url);
  }
}
