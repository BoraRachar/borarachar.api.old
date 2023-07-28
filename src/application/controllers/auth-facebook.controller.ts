/* eslint-disable  @typescript-eslint/no-explicit-any */
import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class AuthFacebookController {
  @Get("/facebook")
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get("/facebook/redirect")
  @UseGuards(AuthGuard("facebook"))
  async facebookLoginRedirect(
    @Query("code") code: string,
    @Res() response,
  ): Promise<any> {
    console.log(JSON.stringify(code));

    return response.json(JSON.stringify(code));
  }
}
