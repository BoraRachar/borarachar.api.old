import { ApiProperty } from "@nestjs/swagger";
import {
  IS_EMAIL,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from "class-validator";
import { Match } from "../decorators/match.decorator";
import { CreateUserErrors } from "../enum/create-user-errors.enum.spec";

export class ResetPasswordDto {
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
    description: "A confirmação da senha é obrigatória",
  })
  @IsString()
  @Match("password", {
    message: CreateUserErrors.PASSWORDS_MATCH,
  })
  @IsNotEmpty({ message: CreateUserErrors.PASSWORD_MIN_REQUIREMENTS })
  confirmPassword: string;
}
