import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from "class-validator";
import { Match } from "../decorators/match.decorator";

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: "Email é obrigatório",
  })
  @IsNotEmpty({ message: "Não pode ser vazio" })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: "Senha é obrigatória",
  })
  @IsString()
  @MinLength(8, { message: "Deve ter no mínimo 8 caracteres" })
  @IsNotEmpty({ message: "Não pode ser vazio" })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minSymbols: 1,
      minUppercase: 1,
      minNumbers: 1,
    },
    {
      message:
        "Senha deve conter no mínimo 8 caracteres, 1 letra minúscula, 1 letra maiúscula e 1 caractere especial",
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
    message: "Confirmação de senha deve ser igual a senha informada.",
  })
  @IsNotEmpty({ message: "Não pode ser vazio" })
  confirmPassword: string;
}
