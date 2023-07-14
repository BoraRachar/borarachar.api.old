import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from '../../domain/services/auth.service';
import { LoginInfoDto } from "src/domain/dto/login.dto";
import { LocalAuthGuard } from "src/domain/core/auth/local-auth.guard";
import { ApiBadRequestResponse, ApiOkResponse } from "@nestjs/swagger";

@Controller("login")
export class AuthController {
  constructor(private authService: AuthService){}

  @Post()
  @ApiOkResponse({ description: "User has sucessfully logged in." })
  @ApiBadRequestResponse({ description: "Invalid email or password." })
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginInfo: LoginInfoDto) {
    return await this.authService.login(loginInfo.email)
  }

}
