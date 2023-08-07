import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from "@nestjs/common";
import { CreateUserDto } from "src/domain/dto/create-user.dto";
import { UserService } from "src/domain/services/user.service";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import { KeyService } from "src/domain/services/key.service";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly keyService: KeyService,
  ) {}

  @Post()
  async createUser(@Body() userInfo: CreateUserDto, @Res() response: Response) {
    try {
      const user = await this.userService.createUser(userInfo);

      return response.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      if (error) {
        throw new HttpException(
          "Hove um erro! ",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get("confirmEmail/:key")
  async confirmUser(@Param("key") key: string, @Res() response: Response) {
    try {
      const valid = await this.keyService.confirmEmailCadastro(key);

      if (valid) {
        return response
          .status(HttpStatus.CREATED)
          .redirect("www.borarachar.online");
      } else {
        return response.redirect("www.borarachar.online");
      }
    } catch (error) {
      if (error) {
        throw new HttpException(
          "Hove um erro! ",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
