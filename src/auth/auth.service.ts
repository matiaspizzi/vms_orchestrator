import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.validateUser(email, password);
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: LoginDto) {
    const validated_user = await this.validateUser(user.email, user.password);
    if (!validated_user) throw new UnauthorizedException('Invalid credentials');

    const payload: JwtPayload = { email: user.email, sub: validated_user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
