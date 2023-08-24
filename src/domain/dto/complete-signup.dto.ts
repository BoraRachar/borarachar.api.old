import { ApiProperty } from "@nestjs/swagger";
import { IsCPF } from "class-validator-cpf";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from "class-validator";
import { IsTrue } from "../decorators/isTrue.decorator";
import { CompleteSignupErrors } from "../enum/complete-signup-errors.enum";

export class CompleteSignUpDTO {
  @ApiProperty({
    type: String,
    description: "Nome é obrigatório.",
  })
  @IsNotEmpty({ message: CompleteSignupErrors.NAME_REQUIRED })
  @MinLength(3, { message: CompleteSignupErrors.NAME_MIN_LENGTH })
  @MaxLength(50, { message: CompleteSignupErrors.NAME_MAX_LENGTH })
  @IsString({ message: CompleteSignupErrors.NAME_IS_STRING })
  nome: string;

  @ApiProperty({
    type: String,
    description: "Sobrenome é obrigatório.",
  })
  @IsNotEmpty({ message: CompleteSignupErrors.LASTNAME_REQUIRED })
  @MinLength(3, { message: CompleteSignupErrors.LASTNAME_MIN_LENGTH })
  @MaxLength(50, { message: CompleteSignupErrors.LASTNAME_MAX_LENGTH })
  @IsString({ message: CompleteSignupErrors.LASTNAME_IS_STRING })
  sobreNome: string;

  @ApiProperty({
    type: String,
    description: "CPF é obrigatório.",
  })
  @IsCPF({ message: CompleteSignupErrors.CPF_IS_INVALID })
  @IsNotEmpty({ message: CompleteSignupErrors.CPF_REQUIRED })
  @Length(11, 11, { message: CompleteSignupErrors.CPF_LENGTH })
  cpf: string;

  @ApiProperty({
    type: Boolean,
    description: "Termos são obrigatórios.",
  })
  @IsNotEmpty({ message: CompleteSignupErrors.TERMS_REQUIRED })
  @IsBoolean({ message: CompleteSignupErrors.TERMS_BOOLEAN })
  @IsTrue("termos", { message: CompleteSignupErrors.TERMS_ARE_TRUE })
  termos: boolean;
}
