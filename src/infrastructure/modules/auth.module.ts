import { Module } from "@nestjs/common";
import { SocialStrategy } from "../../domain/core/auth/social.strategy";

@Module({
  providers: [SocialStrategy],
})
export class AuthModule {}
