import {
  Controller,
  Get,
  Post,
  Query,
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

  @Post("/instagram/callback")
  @ApiCreatedResponse({ description: "Succesfully" })
  @ApiUnprocessableEntityResponse({ description: "Bad Request" })
  @ApiForbiddenResponse({ description: "Unauthorized Request" })
  @UseGuards(InstagramOauthGuard)
  async instagramAuthRedirect(@Query("code") code: string, @Res() response) {
    return response.json(JSON.stringify(code));
  }
}
