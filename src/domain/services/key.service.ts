import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { Key } from "../entities/interfaces/key.interface";
import { PrismaService } from "./prisma.service";
import { compareDates } from "../core/dates";

@Injectable()
export class KeyService {
  constructor(private prisma: PrismaService) {}

  async createKeyConfirmEmail(user: User) {
    const days = 2;
    const validate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    const data: Key = {
      userId: user.id,
      value: uuidv4(),
      validate: validate,
      expiresIn: days,
    };

    const key = await this.prisma.key.create({ data });
    return key;
  }

  async confirmEmailCadastro(key: string) {
    const existKey = await this.prisma.key.findUnique({
      where: { value: key, status: true },
    });

    if (existKey == null) {
      throw new HttpException("Chave invalida", HttpStatus.NOT_FOUND);
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
