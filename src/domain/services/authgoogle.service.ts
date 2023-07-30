import { User } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { UserService } from "./user.service";
import { SocialUser } from "../entities/interfaces/socialUser.interface";
import { Login, Token } from "../entities/interfaces/login.interface";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { config } from "process";

@Injectable()
export class AuthGoogleService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async getUser(socialId: string): Promise<User | null> {
    return await this.userService.findOneUserbySocialId(socialId);
  }

  async newUser(data: SocialUser): Promise<User | null> {
    return await this.userService.userCreate({
      id: uuidv4(),
      email: data.email,
      socialId: data.socialId,
      nome: data.nome,
      provider: data.provider,
    });
  }

  async generateToken(email: string, id: string): Promise<Token> {
    const payload = { sub: email, subject: id };
    const config = {
      secret: this.configService.get<string>("JWT_SECRET"),
      expiresIn: "2hours",
    };

    const accessToken = await this.jwtService.signAsync(payload, config);
    const refreshToken = await this.jwtService.signAsync(payload, config);

    const token: Token = {
      accessToken,
      refreshToken,
    };

    return token;
  }

  async socialLogin(user: SocialUser): Promise<Login> {
    if (user != null) {
      const find = await this.getUser(user.socialId);

      if (find != null) {
        const token = await this.generateToken(find.email, find.socialId);
        console.log("Token: ", token);

        const res: Login = {
          user: {
            nome: find.nome,
            email: find.email,
            provider: find.provider,
          },
          token: token,
        };

        return res;
      }
    } else {
      const newUser = await this.newUser(user);

      const token = await this.generateToken(newUser.email, newUser.socialId);
      const res: Login = {
        user: {
          nome: newUser.nome,
          email: newUser.email,
          provider: newUser.provider,
        },
        token: token,
      };

      return res;
    }
  }
}
