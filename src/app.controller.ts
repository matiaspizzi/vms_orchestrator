import { Controller, Request, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('HealthCheck')
  getHealthCheck(): string {
    return this.appService.getHealthCheck();
  }

  @Get('profile')
  getProfile(@Request() req) {
    return 'ASDASD';
  }
}
