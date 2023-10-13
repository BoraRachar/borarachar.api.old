import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  Redirect,
  Query,
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
import { KeyService } from "../../domain/services/key.service";

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

  @Get(":email")
  @ApiCreatedResponse({ description: "Succesfully" })
  @ApiUnprocessableEntityResponse({ description: "Bad Request" })
  @ApiForbiddenResponse({ description: "Unauthorized Request" })
  async findUser(@Param() params, @Res() response: Response) {
    const user = await this.userService.findOneUserbyEmail(params.email);

    return response.status(HttpStatus.OK).json(user);
  }

  @Get("confirmEmail/:key")
  @ApiCreatedResponse({ description: "Succesfully" })
  @ApiUnprocessableEntityResponse({ description: "Bad Request" })
  @ApiForbiddenResponse({ description: "Unauthorized Request" })
  @Redirect()
  async confirmUser(@Param("key") key: string, @Res() response: Response) {
    const existingKey = await this.keyService.confirmEmailCadastro(key);
    if (existingKey) {
      const token = await this.keyService.createToken(existingKey.userId);
      console.info("ConfirmToken: ", token);

      const url = `http://borarachar.online/register/complete/${token}`;

      return response.redirect(url);
    } else {
      const url = `http://borarachar.online`;
      return response.redirect(url);
    }
  }

  //@Get("getUserByToken/:token")
  //@ApiCreatedResponse({ description: "Succesfully" })
  //@ApiUnprocessableEntityResponse({ description: "Bad Request" })
  //@ApiForbiddenResponse({ description: "Unauthorized Request" })
  //async getUserByToken(
  //  @Param("token") token: string,
  //  @Res() response: Response,
  //) {
  //  const userId = token.split("$")[0];

  //  const user = await this.userService.findOneUserById(userId);
  //  if (user) {
  //   return response.status(HttpStatus.OK).json({
  //     userId: user.id,
  //     email: user.email,
  //   });
  // } else {
  //   throw new HttpException("Token inválido", HttpStatus.BAD_REQUEST);
  //  }
  //}

  //@Put("completeSignUp/:userId")
  //@ApiCreatedResponse({ description: "Succesfully" })
  //@ApiUnprocessableEntityResponse({ description: "Bad Request" })
  //@ApiForbiddenResponse({ description: "Unauthorized Request" })
  //@Redirect()
  //async completeSignUp(
  //  @Param("userId") userId: string,
  //  @Body() data: CompleteSignUpDTO,
  //  @Res() response: Response,
  //) {
  //  const status = await this.userService.completeSignUp(userId, data);

  //    if (status != null) {
  //      return response.status(HttpStatus.OK).json({
  //       statusCode: HttpStatus.OK,
  //      mensagem: "Atualizado com sucesso.",
  //   });
  //} else {
  //  return response.status(HttpStatus.BAD_REQUEST).json({
  //   statusCode: HttpStatus.BAD_REQUEST,
  //   mensagem: "Houve um erro ao tentar atualizar.",
  //});
  // }
  // }

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
        statusCode: HttpStatus.BAD_REQUEST,
        mensagem:
          "Houve um erro ao tentar envia o email. Tente novamente mais tarde!",
      });
    }
  }
}
