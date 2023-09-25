import { Controller, Param, Post, HttpStatus, Res } from '@nestjs/common';
import { UserService } from '../../domain/services/user.service';
import { Response } from 'express';
import { ValidateEmailPipe } from '../../domain/core/pipes/validate-email.pipe';

@Controller("recoverPassword")
export class ForgotPasswordController{
  constructor(
    private readonly UserService: UserService,
  ){}

  @Post("sendEmail/:email")
  async sendForgotPasswordEmail (@Param("email", ValidateEmailPipe) email: string, @Res() response: Response) {

    const sendEmail = await this.UserService.recoverPassword(email);

    return response.status(HttpStatus.CREATED).json(sendEmail)
  }
}
