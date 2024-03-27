import { Injectable } from "@nestjs/common";
import { EncryptionService } from "../encryption/encryption.service";
import { Encrypted } from "../encryption/encrypted";


@Injectable()
export class CookieCrypt {
  constructor(
    protected encryptionService: EncryptionService,
  ) {
    //
  }

  encrypt(value) {
    const encrypted: Encrypted = this.encryptionService.encrypt(value);

    return encrypted.toString();
  }

  decrypt(content) {
    const encrypted = Encrypted.parse(content);

    return this.encryptionService.decrypt(encrypted);
  }
}
