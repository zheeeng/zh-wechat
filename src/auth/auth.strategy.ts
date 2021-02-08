import { ExtractJwt, Strategy as JStrategy } from 'passport-jwt';
import { Strategy as LStrategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWT } from 'src/constants';
import { AuthService } from './auth.service';
import { User } from './auth.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(JStrategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT.SECRET,
    });
  }

  async validate(payload: { sub: string; username: string }) {
    return { id: payload.sub, username: payload.username };
  }
}

@Injectable()
export class LocalStrategy extends PassportStrategy(LStrategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
