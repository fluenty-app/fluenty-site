import { ValidationPipe as BaseValidationPipe } from "@nestjs/common";
import { ValidationError } from "@nestjs/common/interfaces/external/validation-error.interface";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { ErrorResponse } from "../response/error-response";
import Lang, { trans } from "../../lang";
import { getMetadataStorage } from "class-validator";

export class ValidationPipe extends BaseValidationPipe {
  protected transformErrors(validationErrors: ValidationError[]) {
    const response: Record<any, any> = {};

    validationErrors.map(
      (validationError) => response[validationError.property] = Object.entries(validationError.constraints)
        .map(([key, value]) => {
          const validationMetas = getMetadataStorage().getTargetValidationMetadatas(
            validationError.target.constructor,
            validationError.target.constructor.name,
            true,
            false,
          );

          const constraints = validationMetas.find(
            meta => meta.propertyName === validationError.property && meta.name === key
          )?.constraints || [];

          const translation = Lang.validation[key];

          return translation
            ? trans(translation, {
              attribute: Lang.validation.attributes[validationError.property] || validationError.property,
              ...constraints.reduce(
                (accumulator, current, index) => {
                  accumulator['constraint' + (index + 1)] = current;

                  return accumulator
                },
                {}
              ),
            })
            : value;
        })
    );

    return response;
  }

  public createExceptionFactory() {
    return (validationErrors: ValidationError[] = []) => {
      const response = new ErrorResponse(
        Lang.validation.error,
        this.transformErrors(validationErrors)
      )

      response.setStatus(this.errorHttpStatusCode);

      return new HttpErrorByCode[this.errorHttpStatusCode](response);
    };
  }
}
