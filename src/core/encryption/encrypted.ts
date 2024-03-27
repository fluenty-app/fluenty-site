export class Encrypted {
  constructor(
    public value: Buffer,
    public iv: Buffer,
  ) {
    //
  }

  static parse(encryptedValue) {
    const json = JSON.parse(
      Buffer.from(encryptedValue, 'base64').toString()
    );

    return new Encrypted(
      Buffer.from(json.value, 'base64'),
      Buffer.from(json.iv, 'base64')
    )
  }

  toString() {
    const json = {
      iv: this.iv,
      value: this.value,
    }

    return Buffer
      .from(JSON.stringify(json))
      .toString("base64");
  }
}
