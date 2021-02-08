import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './auth.guard';
import { User } from './auth.entity';
import { CreateUserDto, UpdateUserPasswordDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    await this.authService.register(
      User.fromUsernameAddPassowrd(user.username, user.password),
    );
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logPoster(@Request() req: Request) {
    if (req.user) return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('password')
  async update(
    @Body() passwordInfo: UpdateUserPasswordDto,
    @Request() req: Request,
  ) {
    await this.authService.updatePassword(
      +req.user.id,
      passwordInfo.oldPassword,
      passwordInfo.password,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: Request) {
    return req.user;
  }
}
