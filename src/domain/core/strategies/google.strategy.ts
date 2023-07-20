/* eslint-disable  @typescript-eslint/no-explicit-any */
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import "dotenv/config";
import { Injectable } from "@nestjs/common";
import { GoogleProvider } from "../../../infrastructure/providers/google.provider";

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
    done(null, profile);
  }
}
