import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { User, Prisma } from "@prisma/client";
import { EmailService } from "./email.service";
import { KeyService } from "./key.service";
import { JsonObject } from "@prisma/client/runtime/library";
import { encryptPass } from "../core/hashPassword";
import { TypeKeys } from "../../common/constants/key.default";

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private keyService: KeyService,
  ) {}

  async findOneUserbyEmail(
    email: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: email,
    });
    return user;
  }

  async findOneUserbySocialId(socialId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { socialId: socialId },
    });
    return user;
  }

  async findOneUserById(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    return user;
  }

  async socialUserCreate(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.create({ data });

    const key = await this.keyService.createKeyConfirmEmail(user);

    await this.emailService.sendEmailBoasVindas(user, key.value);

    return user;
  }

  async validUser(email) {
    const now = new Date();

    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    console.info("UserValid: ", user != null ? user.id : "Invalido");

    if (user != null) {
      const keys = await this.prisma.key.findMany({
        where: {
          userId: user.id,
          type: "Cadastro",
        },
      });

      console.info("KeysCount: ", keys.length);

      for (const key in keys) {
        console.info("KeyUpdate: ", key);
        await this.prisma.key.update({
          where: {
            id: keys[key].id,
          },
          data: {
            status: false,
          },
        });
      }

      const newKey = await this.keyService.createKey(
        user,
        TypeKeys.ResendEmailConfirmar,
      );

      console.info("NewKey: ", newKey.value);

      const send = await this.emailService.sendEmailBoasVindas(
        user,
        newKey.value,
      );

      return true;
    } else {
      return false;
    }
  }

  async createUser(data: Prisma.UserCreateInput): Promise<JsonObject> {
    const exist = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    console.info("ExistsUser: ", exist != null ? exist.id : "Não cadastrado");

    if (exist != null) {
      throw new HttpException("Usuario já Cadastrado ", HttpStatus.BAD_REQUEST);
    }

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: await encryptPass(data.password),
      },
    });

    console.info("CreateUser: ", user.id);

    const key = await this.keyService.createKeyConfirmEmail(user);

    await this.emailService.sendEmailBoasVindas(user, key.value);

    if (user != null) {
      return {
        statusCode: 201,
        message: "Usuario criado com sucesso",
      };
    } else {
      return {
        statusCode: 400,
        message: "Falha ao criar o usuario",
      };
    }
  }

  async completeSignUp(
    userId: string,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user)
      throw new HttpException("Usuário não encontrado", HttpStatus.NOT_FOUND);

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
        updatedAt: Date(),
      },
    });

    return updatedUser;
  }
}
