import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { GoogleOauthGuard } from "../../domain/core/guards/google-oauth.guard";
import { AuthGoogleService } from "../../domain/services/authgoogle.service";

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

  @Get("/google/callback")
  @ApiCreatedResponse({ description: "Succesfully" })
  @ApiUnprocessableEntityResponse({ description: "Bad Request" })
  @ApiForbiddenResponse({ description: "Unauthorized Request" })
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() request, @Res() response) {
    return response.json(
      await this.authGoogleService.socialLogin(request.user),
    );
  }
}
