import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';

@Controller('/login')
export class AuthenticationController {
  constructor(
    protected authenticationService: AuthenticationService,
  ) {
    //
  }

  @Post('/login')
  async login(@Body() request: LoginRequestDto) {
    return this.authenticationService.login(request);
  }

  @Post('/register')
  async register(@Body() request: RegisterRequestDto) {
    return this.authenticationService.register(request);
  }
}
