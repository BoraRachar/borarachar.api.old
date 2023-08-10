import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumberString, IsString, Length, MaxLength, MinLength } from "class-validator";
import { IsTrue } from "../decorators/isTrue.decorator";

export class CompleteSignUpDTO {
  @ApiProperty({
    type: String,
    description: "Nome é obrigatório."
  })
  @IsNotEmpty({ message: "Nome não pode ser vazio." })
  @MinLength(3, { message: "Nome deve ter no mínimo 3 caracteres." })
  @MaxLength(50, { message: "Nome deve ter no máximo 50 caracteres." })
  @IsString({ message: "Nome precisa ser uma string." })
  nome: string;

  @ApiProperty({
    type: String,
    description: "Sobrenome é obrigatório."
  })
  @IsNotEmpty({ message: "Sobrenome não pode ser vazio." })
  @MinLength(3, { message: "Sobrenome deve ter no mínimo 3 caracteres." })
  @MaxLength(50, { message: "Sobrenome deve ter no máximo 50 caracteres." })
  @IsString({ message: "Sobrenome precisa ser uma string." })
  sobreNome: string;

  @ApiProperty({
    type: String,
    description: "CPF é obrigatório."
  })
  @IsNotEmpty({ message: "CPF não pode ser vazio." })
  @Length(11, 11, { message: "CPF deve conter exatamente 11 caracteres." })
  @IsNumberString() // corrigir ou colocar validate
  cpf: string;

  @ApiProperty({
    type: String,
    description: "Termos são obrigatórios."
  })
  @IsBoolean()
  @IsTrue("termos", {message: "Termos devem ser aceitos."})
  termos: boolean;
}
