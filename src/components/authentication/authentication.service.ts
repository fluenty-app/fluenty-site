import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { HashService } from '../../core/hash/hash.service';
import { resolveAuthenticatedUser } from '../auth/resolvers/authenticated-user.resolver';
import { SuccessResponse } from '../../core/response/success-response';
import Lang from '../../lang';
import { UserNotFoundException } from '../auth/exceptions/user-not-found.exception';
import { AuthException } from '../auth/exceptions/auth.exception';
import { User } from '../users/schemas/user.schema';
import { AuthManagerService } from '../auth/services/auth-manager.service';
import { RegisterRequestDto } from './dto/register-request.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    protected authManagerService: AuthManagerService,
    protected usersService: UsersService,
    protected hashService: HashService,
  ) {
    //
  }

  async retrieveUser(username: string) {
    let user: User;

    try {
      user = await this.usersService.findByAuthUsername(username);
    } catch (e) {
      throw new UserNotFoundException();
    }

    await this.ensureLoginAbility(user);

    return user;
  }

  async ensureLoginAbility(user: User) {
    if (!user.enabled) {
      throw new AuthException(Lang.auth.userDisabled);
    }
  }

  async login(request: LoginRequestDto) {
    const user: User = await this.retrieveUser(request.username);

    const passwordMatched = this.hashService.check(request.password, user.password);

    if (!passwordMatched) {
      throw new AuthException(Lang.auth.invalidPassword);
    }

    await this.authManagerService.login(user);

    return new SuccessResponse({
      user: resolveAuthenticatedUser(user),
    }, Lang.auth.loginCompleted);
  }

  async register(request: RegisterRequestDto) {
    const user = await this.usersService.registerUser(
      request.email, request.password, request.getUserData()
    );

    const accessToken = await this.authManagerService.login(user);

    return new SuccessResponse({
      user: resolveAuthenticatedUser(user),
      accessToken: resolveNewAccessToken(accessToken),
    }, Lang.auth.registrationCompleted);
  }
}

