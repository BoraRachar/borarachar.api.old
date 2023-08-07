import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinLength,
  isBoolean,
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
  @ApiProperty({
    type: String,
    description: "Nome é obrigatório",
  })
  @IsString()
  @IsNotEmpty({ message: "Não pode ser vazio" })
  nome: string;
  @ApiProperty({
    type: String,
    description: "Sobre Nome é obrigatório",
  })
  @IsString()
  @IsNotEmpty({ message: "Não pode ser vazio" })
  sobreNome: string;
  @ApiProperty({
    type: Boolean,
    description: "Termos é obrigatório",
  })
  @IsBoolean()
  termos: boolean;
}
