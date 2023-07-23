import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { InstagramOauthGuard } from "../../domain/core/guards/instagram-oauth.guard";

@ApiTags("InstagramLogin")
@Controller("")
export class AuthInstagramController {
  @Get("instagram")
  @ApiCreatedResponse({ description: "Succesfully" })
  @ApiUnprocessableEntityResponse({ description: "Bad Request" })
  @ApiForbiddenResponse({ description: "Unauthorized Request" })
  @UseGuards(InstagramOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async instagram(@Req() request) {}

  @Get("/instagram/callback")
  @ApiCreatedResponse({ description: "Succesfully" })
  @ApiUnprocessableEntityResponse({ description: "Bad Request" })
  @ApiForbiddenResponse({ description: "Unauthorized Request" })
  @UseGuards(InstagramOauthGuard)
  async instagramAuthRedirect(@Req() request, @Res() response) {
    return response.json(request.user);
  }
}
