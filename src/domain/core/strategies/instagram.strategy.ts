/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-instagram";
import { Profile } from "passport-facebook";
import { MetaProvider } from "../../../infrastructure/providers/meta.provider";

@Injectable()
export class InstagramStrategy extends PassportStrategy(Strategy, "instagram") {
  constructor(provider?: MetaProvider) {
    super({
      clientID: provider.clientID || "0",
      clientSecret: provider.clientSecret,
      callbackURL: provider.callBackURL,
      scope: provider.scope,
      profileFields: provider.profileFields,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: unknown, user: unknown, info?: unknown) => void,
  ): Promise<any> {
    const { name, username } = profile;
    const user = {
      email: username,
      name: name,
    };

    const payload = {
      user,
      accessToken,
    };

    done(null, payload);
  }
}
