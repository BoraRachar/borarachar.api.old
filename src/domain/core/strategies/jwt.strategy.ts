import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Strategy, ExtractJwt } from "passport-jwt";
import "dotenv/config";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExipration: false,
      secretOrKey: configService.get<string>("JWT_SECRET"),
    });
  }

  async validate(username: string, password: string): Promise<boolean> {
    // console.log(username,password);
    return true;
  }
}
