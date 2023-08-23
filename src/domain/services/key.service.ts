import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { PrismaService } from "./prisma.service";
import { compareDates } from "../core/dates";
import {
  TypeKeys,
  Validade,
  daysValidKeys,
} from "src/common/constants/key,default";

@Injectable()
export class KeyService {
  constructor(private prisma: PrismaService) {}

  async createKey(user: User, type: TypeKeys) {
    const key = await this.prisma.key.create({
      data: {
        userId: user.id,
        value: uuidv4(),
        validate: Validade(),
        expiresIn: daysValidKeys,
        type: type,
      },
    });
    return key;
  }

  async createToken(userId: string) {
    return `${userId}$${process.env.JWT_SECRET}`;
  }

  async createKeyConfirmEmail(user: User) {
    const days = 2;
    const validate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    const key = await this.prisma.key.create({
      data: {
        userId: user.id,
        value: uuidv4(),
        validate: validate,
        expiresIn: days,
        type: "Cadastro",
      },
    });
    return key;
  }

  async confirmEmailCadastro(key: string) {
    const existKey = await this.prisma.key.findUnique({
      where: { value: key },
    });

    if (existKey == null) {
      throw new HttpException("Chave invalida", HttpStatus.NOT_FOUND);
    }

    if (existKey.status == false) {
      throw new HttpException(
        "Chave vencida, por favor solicitar um novo email de confirmação",
        HttpStatus.NOT_FOUND,
      );
    }

    const now = new Date();

    const validDate = compareDates(existKey.validate, now);

    if (validDate == +1 || validDate == 0) {
      await this.prisma.key.update({
        where: {
          id: existKey.id,
        },
        data: {
          status: false,
        },
      });

      await this.prisma.user.update({
        where: {
          id: existKey.userId,
        },
        data: {
          validateUser: true,
        },
      });

      return existKey;
    } else {
      await this.prisma.key.update({
        where: {
          id: existKey.id,
        },
        data: {
          status: false,
        },
      });
      throw new HttpException("Chave expirada", HttpStatus.BAD_REQUEST);
    }
  }
}
