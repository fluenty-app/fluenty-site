import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('/auth')
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

  @Get('/me')
  async me(@Auth() auth) {
    return this.authenticationService.getMe(auth);
  }
}
