import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SocialStrategy extends PassportStrategy(null, "social") {
  constructor(configureService: ConfigService) {
    super({
      callbackURL: "",
      scope: ["public_profile"],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: string) {
    return profile;
  }
}
