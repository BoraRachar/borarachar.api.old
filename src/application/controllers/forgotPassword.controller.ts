/* eslint-disable prettier/prettier */
import { Controller, Param, Post, HttpStatus, Res, Body, Patch } from '@nestjs/common';
import { UserService } from '../../domain/services/user.service';
import { Response } from 'express';
import { ValidateEmailPipe } from '../../domain/core/pipes/validate-email.pipe';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../../domain/dto/create-user.dto';

@ApiTags("Password")
@Controller("recoverPassword")
export class ForgotPasswordController {
  constructor(private readonly UserService: UserService) {}

  @Post("/:email")
  async sendForgotPasswordEmail(
    @Param("email", ValidateEmailPipe) email: string,
    @Res() response: Response,
  ) {
    const sendEmail = await this.UserService.recoverPassword(email);

    return response.status(HttpStatus.CREATED).json(sendEmail);
  }

  @Patch("/resetPassword") 
  async resetPassword(@Body() {email, password, confirmPassword }: CreateUserDto) {
      return this.UserService.resetPassword(email, password, confirmPassword);
  }
}
