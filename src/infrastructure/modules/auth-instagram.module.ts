import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { InstagramStrategy } from "../../domain/core/strategies/instagram.strategy";
import { InstagramProvider } from "../providers/instagram.provider";
import { AuthInstagramController } from "../../application/controllers/authinstagram.controller";
import { FacebookStrategy } from "../../domain/core/strategies/facebook.strategy";
import { AuthFacebookController } from "../../application/controllers/auth-facebook.controller";
import { MetaProvider } from "../providers/meta.provider";

@Module({
  imports: [PassportModule],
  controllers: [],
  providers: [
    InstagramStrategy,
    InstagramProvider,
    FacebookStrategy,
    MetaProvider,
  ],
})
export class AuthInstagramModule {}
