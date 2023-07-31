import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "../../domain/services/auth.service";
import { LoginInfoDto } from "../../domain/dto/login.dto";
import { LocalAuthGuard } from "../../domain/core/auth/local-auth.guard";
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Login")
@Controller("login")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiOkResponse({ description: "User has sucessfully logged in." })
  @ApiBadRequestResponse({ description: "Invalid email or password." })
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginInfo: LoginInfoDto) {
    return await this.authService.login(loginInfo.email);
  }
}
