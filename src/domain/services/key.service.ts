import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { Key } from "../entities/interfaces/key.interface";
import { PrismaService } from "./prisma.service";

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
}
