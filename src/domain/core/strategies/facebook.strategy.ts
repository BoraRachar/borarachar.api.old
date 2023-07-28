/* eslint-disable  @typescript-eslint/no-explicit-any */
import { MetaProvider } from "../../../infrastructure/providers/meta.provider";
import { Injectable } from "@nestjs/common";
import { Profile, Strategy } from "passport-facebook";
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
  constructor(provider?: MetaProvider) {
    super({
      clientID: provider.clientID || "0",
      clientSecret: provider.clientSecret,
      callbackURL: provider.callBackURL,
      scope: provider.scope,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: unknown, user: unknown, info?: unknown) => void,
  ): Promise<any> {
    done(null, profile);
  }
}
