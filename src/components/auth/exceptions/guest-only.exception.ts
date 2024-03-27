import { HttpException, HttpStatus } from '@nestjs/common';
import Lang from '../../../lang';

export class GuestOnlyException extends HttpException {
  constructor() {
    super(Lang.auth.guestOnly, HttpStatus.NOT_ACCEPTABLE);
  }
}
