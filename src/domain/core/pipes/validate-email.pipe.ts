import { PipeTransform, BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ValidateEmailPipe implements PipeTransform<string, string> {

  private emailRegex: RegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  transform(value: string): string {

    if (!this.emailRegex.test(value)) {
      throw new BadRequestException("O email informado não é válido.");
    }
    return value;
  }
}
