export class SmsMessage {
  public receiver: string;

  public lines: string[] = [];

  public className: string = 'Default';

  setReceiver(receiver) {
    this.receiver = receiver;

    return this;
  }

  setLines(lines) {
    this.lines = lines;

    return this;
  }

  addLine(line) {
    this.lines.push(line);

    return this;
  }

  setClassName(className) {
    this.className = className;

    return this;
  }

  payload() {
    return {
      service: 'auth',
      className: this.className,
      data: {
        to: [this.receiver],
        messages: this.lines.join("\n"),
      },
    }
  }
}
