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
      profileFields: provider.profileFields,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: unknown, user: unknown, info?: unknown) => void,
  ): Promise<any> {
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };

    const payload = {
      user,
      accessToken,
    };

    done(null, payload);
  }
}
