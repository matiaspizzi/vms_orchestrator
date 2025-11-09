import { Controller, Request, Post, Body } from '@nestjs/common';
import { Public } from './decorators/public.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @Post('signup')
  async signup(@Request() _req, @Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const access_token = await this.authService.login({
      email: createUserDto.email,
      password: createUserDto.password,
    });
    return { user, ...access_token };
  }

  @Public()
  @Post('login')
  login(@Request() _req, @Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
