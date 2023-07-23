import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { InstagramStrategy } from "../../domain/core/strategies/instagram.strategy";
import { InstagramProvider } from "../providers/instagram.provider";
import { AuthInstagramController } from "../../application/controllers/authinstagram.controller";

@Module({
  imports: [PassportModule],
  controllers: [AuthInstagramController],
  providers: [InstagramStrategy, InstagramProvider],
})
export class AuthInstagramModule {}
