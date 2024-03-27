import * as bcrypt from 'bcrypt';


export class Hash {
  static make(value) {
    return bcrypt.hashSync(value, 10);
  }

  static check(value, hashedValue) {
    return bcrypt.compareSync(value, hashedValue);
  }
}
