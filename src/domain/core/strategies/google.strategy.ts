/* eslint-disable  @typescript-eslint/no-explicit-any */
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import "dotenv/config";
import { Injectable } from "@nestjs/common";
import { GoogleProvider } from "../../../infrastructure/providers/google.provider";
import { SocialUser } from "src/domain/entities/interfaces/socialUser.interface";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private readonly provider: GoogleProvider) {
    super({
      clientID: provider.clientID,
      clientSecret: provider.clientSecret,
      callbackURL: provider.callBackURL,
      scope: provider.scope,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, provider, id } = profile;
    const socialUser: SocialUser = {
      email: emails[0].value,
      nome: `${name.givenName} ${name.familyName}`,
      socialId: id,
      provider: provider,
    };
    done(null, socialUser);
  }
}
