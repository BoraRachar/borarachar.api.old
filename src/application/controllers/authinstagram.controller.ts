import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("InstagramLogin")
@Controller("")
export class AuthinstagramController {
  @Get("instagram")
  @ApiCreatedResponse({ description: "Succesfully" })
  @ApiUnprocessableEntityResponse({ description: "Bad Request" })
  @ApiForbiddenResponse({ description: "Unauthorized Request" })
  @UseGuards(AuthGuard("google"))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async instagram(@Req() request) {}

  @Get("/instagram/callback")
  @ApiCreatedResponse({ description: "Succesfully" })
  @ApiUnprocessableEntityResponse({ description: "Bad Request" })
  @ApiForbiddenResponse({ description: "Unauthorized Request" })
  @UseGuards(AuthGuard("google"))
  async instagramAuthRedirect(@Req() request, @Res() response) {
    return response.json(request.user);
  }
}
