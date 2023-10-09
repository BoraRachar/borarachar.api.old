import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  minLength,
  MinLength,
} from "class-validator";
import { Match } from "../decorators/match.decorator";
import { CreateUserErrors } from "../enum/create-user-errors.enum.spec";
import { CompleteSignupErrors } from "../enum/complete-signup-errors.enum";

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: "O nome é obrigatório",
  })
  @IsNotEmpty({ message: CompleteSignupErrors.NAME_REQUIRED })
  @MinLength(3, { message: CompleteSignupErrors.NAME_MIN_LENGTH })
  @MaxLength(50, { message: CompleteSignupErrors.NAME_MAX_LENGTH })
  nome: string;

  @ApiProperty({
    type: String,
    description: "O sobrenome é obrigatório",
  })
  @IsNotEmpty({ message: CompleteSignupErrors.LASTNAME_REQUIRED })
  @MinLength(3, { message: CompleteSignupErrors.LASTNAME_MIN_LENGTH })
  @MaxLength(50, { message: CompleteSignupErrors.LASTNAME_MAX_LENGTH })
  sobrenome: string;

  @ApiProperty({
    type: String,
    description: "O email é obrigatório",
  })
  @IsNotEmpty({ message: CreateUserErrors.EMAIL_REQUIRED })
  @IsEmail({}, { message: "O email informado nao é válido." })
  email: string;

  @ApiProperty({
    type: String,
    description: "A senha é obrigatória",
  })
  @IsString()
  @MinLength(8, {
    message:
      "A senha deve possuir no mínimo 8 caracteres, contendo pelo menos 1 letra maiúscula, uma letra minúscula e um caractere especial (Ex.: #, $, *, @)",
  })
  @MinLength(8, {
    message:
      "A senha deve possuir no mínimo 8 caracteres, contendo pelo menos 1 letra maiúscula, uma letra minúscula e um caractere especial (Ex.: #, $, *, @)",
  })
  @IsNotEmpty({ message: CreateUserErrors.PASSWORD_MIN_REQUIREMENTS })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minSymbols: 1,
      minUppercase: 1,
      minNumbers: 1,
    },
    {
      message: CreateUserErrors.PASSWORD_MIN_REQUIREMENTS,
    },
  )
  password: string;

  @ApiProperty({
    type: String,
    description: "Confirmar Senha é obrigatória",
  })
  @IsString()
  @MinLength(8)
  @Match("password", {
    message: CreateUserErrors.PASSWORDS_MATCH,
  })
  @IsNotEmpty({ message: CreateUserErrors.PASSWORD_MIN_REQUIREMENTS })
  confirmPassword: string;
}
