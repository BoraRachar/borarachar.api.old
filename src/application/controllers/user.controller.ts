import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import { Redirect } from "@nestjsplus/redirect";
import { CreateUserDto } from "src/domain/dto/create-user.dto";
import { UserService } from "src/domain/services/user.service";
import { Response } from "express";
import { ApiCreatedResponse, ApiForbiddenResponse, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { KeyService } from "src/domain/services/key.service";
import { CompleteSignUpDTO } from "src/domain/dto/complete-signup.dto";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly keyService: KeyService,
  ) {}

  @Post()
  @ApiCreatedResponse({ description: "Succesfully" })
  @ApiUnprocessableEntityResponse({ description: "Bad Request" })
  @ApiForbiddenResponse({ description: "Unauthorized Request" })
  async createUser(@Body() userInfo: CreateUserDto, @Res() response: Response) {
    const user = await this.userService.createUser(userInfo);

    return response.status(HttpStatus.CREATED).json(user);
  }

  @Get("confirmEmail/:key")
  @ApiCreatedResponse({ description: "Succesfully" })
  @ApiUnprocessableEntityResponse({ description: "Bad Request" })
  @ApiForbiddenResponse({ description: "Unauthorized Request" })
  @Redirect()
  async confirmUser(@Param("key") key: string, @Res() response: Response) {
    const existingKey = await this.keyService.confirmEmailCadastro(key);
    if (existingKey) {
      const token = `${existingKey.userId}$${process.env.JWT_SECRET}`;

      const url = `www.borarachar.online/register/complete/${token}`;

      return { statusCode: HttpStatus.ACCEPTED, url };
    } else {
      const url = `www.borarachar.online`;
      return { statusCode: HttpStatus.FOUND, url };
    }
  }

  @Get("getUserByToken/:token")
  @ApiCreatedResponse({ description: "Succesfully" })
  @ApiUnprocessableEntityResponse({ description: "Bad Request" })
  @ApiForbiddenResponse({ description: "Unauthorized Request" })
  async getUserByToken(
    @Param("token") token: string,
    @Res() response: Response,
  ) {
    const userId = token.split("$")[0];

    const user = await this.userService.findOneUserById(userId);
    if (user) {
      return response.status(HttpStatus.OK).json({
        userId: user.id,
        email: user.email,
      });
    } else {
      throw new HttpException("Token inválido", HttpStatus.BAD_REQUEST);
    }
  }

  @Put("completeSignUp/:userId")
  @ApiCreatedResponse({ description: "Succesfully" })
  @ApiUnprocessableEntityResponse({ description: "Bad Request" })
  @ApiForbiddenResponse({ description: "Unauthorized Request" })
  @Redirect()
  async completeSignUp(
    @Param("userId") userId: string,
    @Body() data: CompleteSignUpDTO,
  ) {
    await this.userService.completeSignUp(userId, data);

    const url = `www.borarachar.online/register/successfully`;

    return { statusCode: HttpStatus.CREATED, url };
  }
}
