import { Injectable } from '@nestjs/common';
import { Hash } from './hash';


@Injectable()
export class HashService {
  constructor() {
    //
  }

  make(value) {
    return Hash.make(value);
  }

  check(value, hashedValue) {
    return Hash.check(value, hashedValue);
  }
}
