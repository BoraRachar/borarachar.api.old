import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { User, Prisma } from "@prisma/client";
import { EmailService } from "./email.service";
import { KeyService } from "./key.service";
import { JsonObject } from "@prisma/client/runtime/library";
import { encryptPass } from "../core/hashPassword";

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

  async socialUserCreate(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.create({ data });

    const key = await this.keyService.createKeyConfirmEmail(user);

    await this.emailService.sendEmailBoasVindas(user, key.value);

    return user;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<JsonObject> {
    const exist = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (exist != null) {
      throw new HttpException("Usuario já Cadastrado ", HttpStatus.BAD_REQUEST);
    }

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: await encryptPass(data.password),
      },
    });

    console.log(user);

    const key = await this.keyService.createKeyConfirmEmail(user);

    await this.emailService.sendEmailBoasVindas(user, key.value);

    if (user != null) {
      return {
        message: "Usuario criado com sucesso",
      };
    } else {
      return {
        message: "Falha ao criar o usuario",
      };
    }
  }
}
