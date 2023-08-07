import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { GoogleOauthGuard } from "../../domain/core/guards/google-oauth.guard";
import { AuthGoogleService } from "../../domain/services/authgoogle.service";
import { Response } from "express";

@ApiTags("GoogleLogin")
@Controller("")
export class AuthGoogleController {
  constructor(private authGoogleService: AuthGoogleService) {}

  @Get("google")
  @ApiCreatedResponse({ description: "Succesfully" })
  @ApiUnprocessableEntityResponse({ description: "Bad Request" })
  @ApiForbiddenResponse({ description: "Unauthorized Request" })
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async callback(@Req() request) {}

  @Get("google/callback")
  @HttpCode(200)
  @ApiCreatedResponse({ description: "Succesfully" })
  @ApiUnprocessableEntityResponse({ description: "Bad Request" })
  @ApiForbiddenResponse({ description: "Unauthorized Request" })
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() request, @Res() response: Response) {
    try {
      const user = await this.authGoogleService.socialLogin(request.user);

      response.status(200).json(user);
    } catch (error) {
      if (error) {
        throw new HttpException(
          "Hove um erro! ",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
