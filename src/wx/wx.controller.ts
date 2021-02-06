import { Controller, Get, Req } from '@nestjs/common';
import { WxService } from './wx.service';
import { Request } from 'express'

@Controller('wx')
export class WxController {
  constructor(private readonly wxService: WxService) {}

  @Get()
  getConfig(@Req() req: Request) {
    return this.wxService.getConfig(req.url);
  }
}
