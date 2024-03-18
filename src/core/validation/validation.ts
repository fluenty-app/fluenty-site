import { validate, ValidationError } from "class-validator";

import { ValidationPipe } from "./validation.pipe";

const validationPipe = new ValidationPipe();

const exceptionFactory = validationPipe.createExceptionFactory();

export const customValidate = async (request) => {
  const errors: ValidationError[] = await validate(request);

  if (errors.length) {
    throw exceptionFactory(errors);
  }
}
