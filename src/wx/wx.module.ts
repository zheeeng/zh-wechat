import { Module, HttpModule } from '@nestjs/common';
import { WxController } from './wx.controller';
import { WxService } from './wx.service';

@Module({
  imports: [HttpModule],
  controllers: [WxController],
  providers: [WxService],
})
export class WxModule {}
