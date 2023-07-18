import { Module } from "@nestjs/common";
import { GoogleStrategy } from "../../domain/core/strategies/google.strategy";
import { AuthGoogleController } from "../../application/controllers/authgoogle.controller";
import { PassportModule } from "@nestjs/passport";
import { AuthGoogleService } from "../../domain/services/authgoogle.service";
import { GoogleProvider } from "../providers/google.provider";

@Module({
  imports: [PassportModule],
  controllers: [AuthGoogleController],
  providers: [AuthGoogleService, GoogleStrategy, GoogleProvider],
})
export class AuthGoogleModule {}
