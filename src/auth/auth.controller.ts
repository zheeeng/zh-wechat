import { Controller, Request, Post, UseGuards, Param, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';
import { User } from './auth.entity';
import { CreateUserDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    await this.authService.register(User.fromUsernameAddPassowrd(user.username, user.password));
  }

  @UseGuards(JwtAuthGuard)
  @Post('login')
  async logPoster(@Request() req: Request) {
    if (req.user) return this.authService.login(req.user)
  }
}
