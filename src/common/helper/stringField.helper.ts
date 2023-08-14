import { ValidationError } from "class-validator";

export function stringField(errors: ValidationError[]): string {
  return JSON.stringify(errors)
}
