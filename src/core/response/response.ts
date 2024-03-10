export class Response {
  public data: any;

  public message: string;

  public errors: Record<any, any>;

  public status = null;

  constructor(data, message = "", errors?: Record<any, any>) {
    this.data = data;

    this.message = message;

    this.errors = errors;
  }

  setStatus(status) {
    this.status = status;

    return this;
  }

  setData(data) {
    this.data = data;

    return this;
  }

  setErrors(errors) {
    this.errors = errors;

    return this;
  }

  setMessage(message) {
    this.message = message;

    return this;
  }

  getBody() {
    return {
      message: this.message,
      data: this.data || undefined,
      errors: this.errors,
    }
  }
}
