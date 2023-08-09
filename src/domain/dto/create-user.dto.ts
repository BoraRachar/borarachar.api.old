import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";

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
  @MinLength(8)
  @IsNotEmpty({ message: "Não pode ser vazio" })
  password: string;
  @ApiProperty({
    type: String,
    description: "Confirmar Senha é obrigatória",
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty({ message: "Não pode ser vazio" })
  confirmPassword: string;
}
