import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from "class-validator";
import { Match } from "../decorators/match.decorator";
import { CreateUserErrors } from '../enum/create-user-errors.enum.spec';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: "Email é obrigatório",
  })
  @IsNotEmpty({ message: CreateUserErrors.EMAIL_REQUIRED })
  @IsEmail({}, {message: "Formato de email nao válido."})
  email: string;

  @ApiProperty({
    type: String,
    description: "Senha é obrigatória",
  })
  @IsString()
  @MinLength(8, { message: "Deve ter no mínimo 8 caracteres" })
  @IsNotEmpty({ message: CreateUserErrors.PASSWORD_REQUIRED })
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
  @IsNotEmpty({ message: CreateUserErrors.CONFIRM_PASSWORD_REQUIRED })
  confirmPassword: string;
}
