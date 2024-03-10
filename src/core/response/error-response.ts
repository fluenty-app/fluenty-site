import { Response } from "./response";

export class ErrorResponse extends Response {
  constructor(message = "", errors = {}) {
    super(null, message, errors);
  }
}
