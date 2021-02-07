import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private recordsRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.recordsRepository.findOne({ username });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(user: User) {
    return this.recordsRepository.insert(user)
  }

  async updatePassword(id: number, old: string, fresh: string )  {
    const user = await this.recordsRepository.findOne({ id });

    if (user && user.password === old) {
      return this.recordsRepository.update(id, { password: fresh });
    }
    
    return null;
  }

  async login(user: { username: string, id: string }) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}