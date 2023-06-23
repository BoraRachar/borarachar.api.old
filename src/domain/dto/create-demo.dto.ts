import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateDemoDto {
  @ApiProperty({
    type: String,
    description: "This is a required property",
  })
  property: string;

  @ApiPropertyOptional({
    type: String,
    description: "This is an optional property",
  })
  optionalProperty: string;
}
