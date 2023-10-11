import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "./prisma.service";
import { comparePass } from "../core/hashPassword";
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Login, Token } from "../entities/interfaces/login.interface";
import * as process from "process";
import { transformAndCompareDate } from "../../common/helper/utils.helper";

@Injectable()
export class AuthService {
  private config = {
    secret: this.configService.get<string>("JWT_SECRET"),
    expiresIn: "5min",
  };

  private configRefresh = {
    secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
    expiresIn: "7days",
  };

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
    const payload = { sub: email, subject: user.id };
    const accessToken = await this.jwtService.signAsync(payload, this.config);
    const refreshToken = await this.jwtService.signAsync(
      payload,
      this.configRefresh,
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

  async validateRefreshToken(token: string) {
    const { sub, iat, exp } = await this.jwtService.verifyAsync(token, {
      secret: this.configRefresh.secret,
    });

    const user = await this.prisma.user.findUnique({
      where: {
        email: sub,
      },
    });

    if (!user) {
      throw new NotFoundException("Usuario não encontrado");
    }

    try {
      const isValid = transformAndCompareDate(exp);

      if (isValid) {
        const payload = { sub: user.email, subject: user.id };
        const accessToken = await this.jwtService.signAsync(
          payload,
          this.config,
        );

        const refreshToken = await this.jwtService.signAsync(
          payload,
          this.configRefresh,
        );

        const token: Token = {
          accessToken,
          refreshToken,
          expiresIn: "1day",
        };

        return {
          token,
          statusCode: HttpStatus.OK,
        };
      } else {
        throw new UnauthorizedException("Token inválioa");
      }
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        throw new UnauthorizedException("Assinatura inválida");
      }
      throw new UnauthorizedException(error.name);
    }
  }
}
