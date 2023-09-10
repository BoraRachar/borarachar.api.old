import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "../../domain/services/auth.service";
import { LoginInfoDto } from "../../domain/dto/login.dto";
import { LocalAuthGuard } from "../../domain/core/auth/local-auth.guard";
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";

@ApiTags("Login")
@Controller("login")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiOkResponse({ description: "User has sucessfully logged in." })
  @ApiBadRequestResponse({ description: "Invalid email or password." })
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginInfo: LoginInfoDto, @Res() response: Response) {
    try {
      const login = await this.authService.login(loginInfo.email);

      response.status(HttpStatus.OK).json(login);
    } catch (error) {
      console.info("Login Error:", error);
      if (error) {
        throw new HttpException(
          "Hove um erro! ",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
