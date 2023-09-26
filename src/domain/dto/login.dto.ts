import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginInfoDto {
  @ApiProperty({
    type: String,
    description: "Email é obrigatório.",
  })
  @IsNotEmpty({ message: "Email não pode ser vazio." })
  @IsEmail()
  @IsString({ message: "Email deve ser uma string." })
  email: string;

  @ApiProperty({
    type: String,
    description: "Senha é obrigatória.",
  })
  @IsNotEmpty({ message: "Senha não pode ser vazia." })
  @MinLength(8, { message: "Senha precisa de no mínimo 8 caracteres." })
  @Type(() => String)
  password: string;
}
