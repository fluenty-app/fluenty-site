export class MailMessage {
  public receiver: string;

  public cc: string = '';

  public subject: string;

  public greeting: string;

  public salutation: string = '';

  public introLines: string[] = [];

  public outroLines: string[] = [];

  public actionText: string;

  public actionUrl: string;

  public className: string = 'Default';

  setReceiver(receiver) {
    this.receiver = receiver;

    return this;
  }

  setCc(cc) {
    this.cc = cc;

    return this;
  }

  setSubject(subject) {
    this.subject = subject;

    return this;
  }

  setGreeting(greeting) {
    this.greeting = greeting;

    return this;
  }

  setSalutation(salutation) {
    this.salutation = salutation;

    return this;
  }

  setIntroLines(introLines) {
    this.introLines = introLines;

    return this;
  }

  addIntroLine(introLine) {
    this.introLines.push(introLine);

    return this;
  }

  setOutroLines(outroLines) {
    this.outroLines = outroLines;

    return this;
  }

  addOutroLine(outroLine) {
    this.outroLines.push(outroLine);

    return this;
  }

  setActionText(actionText) {
    this.actionText = actionText;

    return this;
  }

  setActionUrl(actionUrl) {
    this.actionUrl = actionUrl;

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
        to: this.receiver,
        cc: this.cc,
        subject: this.subject,
        greeting: this.greeting,
        salutation: this.salutation,
        introLines: this.introLines,
        outroLines: this.outroLines,
        actionText: this.actionText,
        actionUrl: this.actionUrl,
      },
    }
  }
}
