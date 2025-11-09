import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.validateUser(email, password);
    if (user) {
      return user;
    }
    return null;
  }

  login(user: LoginDto) {
    if (!user.email || !user.password) {
      throw new Error('Invalid user credentials');
    }
    const payload = { email: user.email, sub: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  logout(user: any) {
    // Implement logout logic if needed (e.g., invalidate tokens)
    return { message: 'User logged out successfully' };
  }
}
