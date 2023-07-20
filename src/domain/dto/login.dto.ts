import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class LoginInfoDto {
  @ApiProperty({
    type: String,
    description: "Email is required.",
  })
  @IsNotEmpty({ message: "This field can't be empty." })
  @IsEmail()
  @IsString({ message: "This field must be a string." })
  email: string;

  @ApiProperty({
    type: String,
    description: "Password is required.",
  })
  @IsNotEmpty({ message: "This field can't be empty." })
  @MinLength(8, { message: "This field must have at least 8 characters." })
  @Type(() => String)
  password: string;
}
