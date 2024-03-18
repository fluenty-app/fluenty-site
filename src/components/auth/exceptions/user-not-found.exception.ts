import { HttpStatus } from '@nestjs/common';
import Lang from '../../../lang';
import { AuthException } from './auth.exception';

export class UserNotFoundException extends AuthException {
  constructor() {
    super(Lang.auth.userNotFound, HttpStatus.NOT_FOUND);
  }
}
