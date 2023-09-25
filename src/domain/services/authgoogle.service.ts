import { User } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { UserService } from "./user.service";
import { SocialUser } from "../entities/interfaces/socialUser.interface";
import { Login, Token } from "../entities/interfaces/login.interface";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthGoogleService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async getUser(socialId: string): Promise<User | null> {
    const user = await this.userService.findOneUserbySocialId(socialId);
    return user;
  }

  async newUser(data: SocialUser): Promise<User | null> {
    const add = await this.userService.socialUserCreate({
      id: uuidv4(),
      email: data.email,
      socialId: data.socialId,
      nome: data.nome,
      sobreNome: data.sobreNome,
      provider: data.provider,
      termos: data.termos,
    });
    return add;
  }

  async generateToken(email: string, id: string): Promise<Token> {
    const payload = { sub: email, subject: id };
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

    return token;
  }

  async socialLogin(user: SocialUser): Promise<Login> {
    const find = await this.getUser(user.socialId);

    let userLogin: Login = null;

    if (find != null) {
      const token = await this.generateToken(find.email, find.socialId);
      userLogin = {
        user: {
          nome: find.nome,
          sobreNome: find.sobreNome,
          email: find.email,
          provider: find.provider,
          termos: find.termos,
          validateUser: find.validateUser,
        },
        token: token,
      };
    } else {
      const newUser = await this.newUser(user);

      const token = await this.generateToken(newUser.email, newUser.socialId);
      userLogin = {
        user: {
          nome: newUser.nome,
          sobreNome: newUser.sobreNome,
          email: newUser.email,
          provider: newUser.provider,
          validateUser: false,
          termos: false,
        },
        token: token,
      };
    }

    return userLogin;
  }
}
