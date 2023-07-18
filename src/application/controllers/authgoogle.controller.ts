import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGoogleService } from "../../domain/services/authgoogle.service";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";

@ApiTags("GoogleLogin")
@Controller("")
export class AuthGoogleController {
  constructor(private readonly authService: AuthGoogleService) {}

  @Get()
  @ApiCreatedResponse({ description: "Succesfully" })
  @ApiUnprocessableEntityResponse({ description: "Bad Request" })
  @ApiForbiddenResponse({ description: "Unauthorized Request" })
  @UseGuards(AuthGuard("google"))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth(@Req() request) {
    console.log(JSON.stringify(request));
  }

  @Get("/auth/google/callback")
  @ApiCreatedResponse({ description: "Succesfully" })
  @ApiUnprocessableEntityResponse({ description: "Bad Request" })
  @ApiForbiddenResponse({ description: "Unauthorized Request" })
  @UseGuards(AuthGuard("google"))
  async googleAuthRedirect(@Req() request) {
    return this.authService.googleLogin(request);
  }
}
