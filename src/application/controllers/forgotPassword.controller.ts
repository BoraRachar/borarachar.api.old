import {
  Controller,
  Param,
  Post,
  HttpStatus,
  Res,
  Put,
  Body,
} from "@nestjs/common";
import { UserService } from "../../domain/services/user.service";
import { Response } from "express";
import { ValidateEmailPipe } from "../../domain/core/pipes/validate-email.pipe";
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { ResetPasswordDto } from "../../domain/dto/reset-password.dto";

@ApiTags("Password")
@Controller("recoverPassword")
export class ForgotPasswordController {
  constructor(private readonly UserService: UserService) {}

  @Post("sendEmail/:email")
  async sendForgotPasswordEmail(
    @Param("email", ValidateEmailPipe) email: string,
    @Res() response: Response,
  ) {
    const sendEmail = await this.UserService.recoverPassword(email);

    return response.status(HttpStatus.CREATED).json(sendEmail);
  }

  @Put("/resetPassword")
  @ApiOkResponse({ description: "Success" })
  @ApiUnprocessableEntityResponse({ description: "Bad Request" })
  @ApiForbiddenResponse({ description: "Unauthorized Request" })
  async resetPassword(@Body() reset: ResetPasswordDto) {
    console.info("Request: ", reset);
    return await this.UserService.resetPassword(reset);
  }
}
