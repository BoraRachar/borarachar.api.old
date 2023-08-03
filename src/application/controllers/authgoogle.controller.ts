import { Controller, Get, HttpCode, Req, Res, UseGuards } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { GoogleOauthGuard } from "../../domain/core/guards/google-oauth.guard";
import { AuthGoogleService } from "../../domain/services/authgoogle.service";
import * as console from "console";

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
  async googleAuthRedirect(@Req() request) {
    const user = await this.authGoogleService.socialLogin(request.user);

    return user;
  }
}
