import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthGoogleController } from "../../application/controllers/authgoogle.controller";
import { AuthGoogleService } from "../../domain/services/authgoogle.service";
import { GoogleStrategy } from "../../domain/core/strategies/google.strategy";
import { GoogleProvider } from "../providers/google.provider";

@Module({
  imports: [PassportModule],
  controllers: [AuthGoogleController],
  providers: [AuthGoogleService, GoogleStrategy, GoogleProvider],
})
export class AuthInstagramModule {}
