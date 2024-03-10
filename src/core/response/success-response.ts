import { Response } from "./response";

export class SuccessResponse extends Response {
  static make(data, message = "") {
    return new SuccessResponse(data, message);
  }

  constructor(data, message = "") {
    super(data, message);
  }
}
