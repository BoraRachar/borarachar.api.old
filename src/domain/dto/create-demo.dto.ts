import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreateDemoDto {
  @ApiProperty({
    type: String,
    description: "This is a required property",
  })
  @IsNotEmpty({ message: "Não pode ser vazio" })
  @Length(3, 10, { message: "Deve ter entre 3 e 10 cararcteres" })
  property: string;

  @ApiPropertyOptional({
    type: String,
    description: "This is an optional property",
  })
  optionalProperty: string;
}
