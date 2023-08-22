import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  Redirect,
} from "@nestjs/common";
import { CreateUserDto } from "../../domain/dto/create-user.dto";
import { UserService } from "../../domain/services/user.service";
import { Response } from "express";
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
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

      const url = `http://borarachar.online/register/complete/${token}`;

      //return { statusCode: HttpStatus.FOUND, url };
      return response.redirect(url);
    } else {
      const url = `http://borarachar.online`;
      return response.redirect(url);
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
    @Res() response: Response,
  ) {
    await this.userService.completeSignUp(userId, data);

    const url = `http://borarachar.online/register/successfully`;

    return response.redirect(url);
  }

  @Post("resendEmail/:email")
  @ApiAcceptedResponse({ description: "Sucesso" })
  @ApiBadRequestResponse({ description: "Falha no envio" })
  @ApiForbiddenResponse({ description: "Não Autorizado" })
  async resendEmail(@Param("email") email: string, @Res() response: Response) {
    const resend = await this.userService.validUser(email);

    if (resend) {
      return response.status(HttpStatus.ACCEPTED).json({
        statusCode: HttpStatus.ACCEPTED,
        mensagem: "Email enviado com sucesso",
      });
    } else {
      return response.status(HttpStatus.BAD_REQUEST).json({
        mensagem:
          "Houve um erro ao tentar envia o email. Tente novamente mais tarde!",
      });
    }
  }
}
