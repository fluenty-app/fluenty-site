import { HttpException } from '@nestjs/common';

export class AuthException extends HttpException {
  constructor(response: string | Record<string, any>, status: number = 406) {
    super(response, status);
  }
}
