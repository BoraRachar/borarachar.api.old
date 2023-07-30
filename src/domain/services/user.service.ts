import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { User, Prisma } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
  async userCreate(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.create({ data });
    return user;
  }
}
