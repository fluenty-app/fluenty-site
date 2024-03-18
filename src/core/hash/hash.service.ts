import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';


@Injectable()
export class HashService {
  constructor() {
    //
  }

  make(value) {
    return bcrypt.hashSync(value, 10).replace('$2b$', '$2y$');
  }

  check(value, hashedValue) {
    return bcrypt.compareSync(value, hashedValue.replace('$2y$', '$2b$'));
  }
}
