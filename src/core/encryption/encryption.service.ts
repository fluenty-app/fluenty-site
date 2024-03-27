import { Injectable } from "@nestjs/common";
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { ConfigService } from "@nestjs/config";
import { Encrypted } from "./encrypted";

@Injectable()
export class EncryptionService {
  protected algorithm = 'AES-256-CBC';

  constructor(
    protected configService: ConfigService,
  ) {
    //
  }

  encrypt(value) {
    const iv = randomBytes(16);

    const cipher = createCipheriv(this.algorithm, this.getKey(), iv);

    const encryptedText = Buffer.concat([
      cipher.update(value.toString()),
      cipher.final(),
    ]);

    return new Encrypted(encryptedText, iv);
  }

  decrypt(encrypted: Encrypted) {
    const decipher = createDecipheriv(this.algorithm, this.getKey(), encrypted.iv);

    return Buffer
      .concat([
        decipher.update(encrypted.value),
        decipher.final(),
      ])
      .toString();
  }

  getKey() {
    return Buffer.from(this.configService.get<string>('app.key'), 'base64')
  }
}
