import { Injectable, HttpService } from '@nestjs/common';
import * as crypto from 'crypto'
import { WX } from 'src/constants';

enum URLS {
  ACCESS_TOKEN = 'https://api.weixin.qq.com/cgi-bin/token',
  TICKET = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
}

@Injectable()
export class WxService {
  constructor(private httpService: HttpService) {}

  private get appId () {
    return WX.APPID
  }
  private get secret () {
    return WX.SECRET
  }
  private accessToken = ''
  private ticket = ''
  getHello(): string {
    return 'Hello World!';
  }

  async getConfig () {
    return {
      appId: this.appId,
      ...await this.signature(WX.REFERRER),
    }
  }

  private async signature(url: string) {
    const jsapi_ticket = await this.getTicket()
    const timestamp = Math.round(Date.now() / 1000).toString()
    const nonceStr = Math.random().toString(36).slice(2)
    const str = `jsapi_ticket=${jsapi_ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`
    const sha1 = crypto.createHash('sha1');
    const signature = sha1.update(str).digest('hex');

    return {
        timestamp,
        nonceStr,
        signature,
    }
  }

  private async getAccessToken () {
    if (this.accessToken) return this.accessToken

    const params = {
      grant_type: 'client_credential',
      appId: this.appId,
      secret: this.secret,
    }

    const response = await this.httpService.get<{
      errcode?: number,
      errmsg?: string,
      access_token: string,
      expires_in: number,
    }>(URLS.ACCESS_TOKEN, {
      params,
    }).toPromise().then(r => r.data)

    if (response.errcode) throw new Error(response.errmsg)

    this.accessToken = response.access_token

    setTimeout(() => {
      this.accessToken = ''
    }, response.expires_in * 0.5 * 1000)

    return this.accessToken
  }

  private async getTicket () {
    if (this.ticket) return this.ticket

    const params = {
      type: 'jsapi',
      access_token: await this.getAccessToken(),
    }

    const response = await this.httpService.get<{
      errcode?: number,
      errmsg?: string,
      ticket: string,
      expires_in: number,
    }>(URLS.TICKET, {
      params,
    }).toPromise().then(r => r.data)

    if (response.errcode) throw new Error(response.errmsg)

    this.ticket = response.ticket

    setTimeout(() => {
      this.ticket = ''
    }, response.expires_in * 0.5 * 1000)

    return this.ticket
  }
}
