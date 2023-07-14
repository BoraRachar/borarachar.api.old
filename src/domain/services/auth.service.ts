import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "./prisma.service";
import { comparePass } from "../core/hashPassword";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      const isPasswordMathing = await comparePass(password, user.password);

      if (isPasswordMathing) return { email: user.email };
    }

    return null;
  }

  async login(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return {
      user: { email },
      accessToken: this.jwtService.sign({
        email: email,
        subject: user.id,
      }),
    };
  }
}
