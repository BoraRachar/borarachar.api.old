import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Headers,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "../../domain/services/auth.service";
import { LoginInfoDto } from "../../domain/dto/login.dto";
import { LocalAuthGuard } from "../../domain/core/auth/local-auth.guard";
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
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
      console.info("LoginRequest : ", loginInfo);
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

  @Post("/refresh-token")
  @ApiOkResponse({ description: "Refresh Token is Valid" })
  @ApiUnauthorizedResponse({ description: "Refresh Token Invalid" })
  async refreshToken(
    @Headers("refreshtoken") refreshtoken: string,
    @Res() res,
  ) {
    if (!refreshtoken) {
      return res.status(400).json({ message: "Refresh token não fornecido." });
    }
    try {
      const newAccessToken = await this.authService.validateRefreshToken(
        refreshtoken,
      );

      if (!newAccessToken) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: "Refresh token inválido ou expirado." });
      }

      // Se o refresh token for válido, retorne um novo token de acesso.
      return res.json(newAccessToken);
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Erro interno do servidor." });
    }
  }
}
