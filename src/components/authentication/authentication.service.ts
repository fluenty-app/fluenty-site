import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { resolveAuthenticatedUser } from '../auth/resolvers/authenticated-user.resolver';
import { SuccessResponse } from '../../core/response/success-response';
import Lang from '../../lang';
import { UserNotFoundException } from '../auth/exceptions/user-not-found.exception';
import { AuthException } from '../auth/exceptions/auth.exception';
import { User } from '../users/schemas/user.schema';
import { AuthManagerService } from '../auth/services/auth-manager.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { resolveNewAccessToken } from '../personal-access-tokens/resolvers/new-access-token.resolver';
import { Hash } from '../../core/hash/hash';

@Injectable()
export class AuthenticationService {
  constructor(
    protected authManagerService: AuthManagerService,
    protected usersService: UsersService,
  ) {
    //
  }

  async retrieveUser(username: string) {
    let user: User;

    try {
      user = await this.usersService.findByAuthUsername(username);
    } catch (e) {
      throw new AuthException(Lang.auth.invalidCredentials);
    }

    return user;
  }

  async ensureLoginAbility(user: User) {
    if (!user.enabled) {
      throw new AuthException(Lang.auth.userDisabled);
    }
  }

  async login(request: LoginRequestDto) {
    const user: User = await this.retrieveUser(request.username);

    const passwordMatched = Hash.check(request.password, user.password);

    if (!passwordMatched) {
      throw new AuthException(Lang.auth.invalidCredentials);
    }

    await this.ensureLoginAbility(user);

    const accessToken = await this.authManagerService.login(user);

    return new SuccessResponse({
      user: resolveAuthenticatedUser(user),
      accessToken: resolveNewAccessToken(accessToken),
    }, Lang.auth.loginCompleted);
  }

  async register(request: RegisterRequestDto) {
    const user = await this.usersService.registerUser(
      request.email, request.password, request.getUserData(),
    );

    const accessToken = await this.authManagerService.login(user);

    return new SuccessResponse({
      user: resolveAuthenticatedUser(user),
      accessToken: resolveNewAccessToken(accessToken),
    }, Lang.auth.registrationCompleted);
  }

  async getMe(user) {
    return new SuccessResponse({
      user: user && resolveAuthenticatedUser(user),
    });
  }
}

