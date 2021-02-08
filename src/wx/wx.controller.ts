import { Controller, Get, Query, Req } from '@nestjs/common';
import { WxService } from './wx.service';

@Controller('wx')
export class WxController {
  constructor(private readonly wxService: WxService) {}

  @Get()
  getConfig(@Query('url') url: string) {
    return this.wxService.getConfig(url);
  }
}
