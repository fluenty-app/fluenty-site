import { Strategy } from 'passport-strategy';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class BaseStrategy extends Strategy {
  validate(request: Request, strategy: 'cookie' | 'jwt') {
    const method = request.header('Authorization-Method') || 'cookie';

    return method.toLowerCase() === strategy;
  }
}

