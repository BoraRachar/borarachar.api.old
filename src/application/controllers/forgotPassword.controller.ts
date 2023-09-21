import { Controller, Param, Post, HttpStatus, Res } from '@nestjs/common';
import { UserService } from '../../domain/services/user.service';
import { KeyService } from '../../domain/services/key.service';
import { Response } from 'express';

@Controller("forgotPassword")
export class ForgotPasswordController{
  constructor(
    private readonly UserService: UserService,
    private readonly KeyService: KeyService
  ){}

  @Post("sendEmail/:email")
  async sendForgotPasswordEmail (@Param("email") email: string, @Res() response: Response) {
    return response.status(HttpStatus.CREATED).json({})
  }
}
