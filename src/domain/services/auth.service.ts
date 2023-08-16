import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "./prisma.service";
import { comparePass } from "../core/hashPassword";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Login, Token } from "../entities/interfaces/login.interface";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      const isPasswordMathing = await comparePass(password, user.password);

      if (isPasswordMathing) return { email: user.email };
    }

    return null;
  }

  async generateToken(email: string, id: string) {
    const payload = { sub: email, subject: id };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async login(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    const key = await this.keyService.find(user.id);

    const now = Date.now();

    // compareDates()
    // 1 (gera nova key, enviar novo email)

    if (user.validateUser == false) {
      throw new HttpException(
        "Verificar email de confirmação",
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = { sub: email, subject: user.id };
    const config = {
      secret: this.configService.get<string>("JWT_SECRET"),
      expiresIn: "1day",
    };

    const configRefresh = {
      secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
      expiresIn: "7days",
    };

    const accessToken = await this.jwtService.signAsync(payload, config);
    const refreshToken = await this.jwtService.signAsync(
      payload,
      configRefresh,
    );

    const token: Token = {
      accessToken,
      refreshToken,
      expiresIn: "1day",
    };

    const userLogin: Login = {
      user: {
        nome: user.nome,
        sobreNome: user.sobreNome,
        email: user.email,
        provider: user.provider,
        termos: user.termos,
        validateUser: user.validateUser,
      },
      token: token,
    };

    return userLogin;
  }
}
