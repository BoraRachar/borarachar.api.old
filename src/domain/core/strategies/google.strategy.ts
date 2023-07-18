/* eslint-disable  @typescript-eslint/no-explicit-any */
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import "dotenv/config";
import { Injectable } from "@nestjs/common";
import { GoogleProvider } from "../../../infrastructure/providers/google.provider";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(provider: GoogleProvider) {
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
    const { name, emails } = profile;

    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      accessToken,
    };
    done(null, user);
  }
}
