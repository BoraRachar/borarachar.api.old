import { Module } from "@nestjs/common";
import { GoogleStrategy } from "../../domain/core/strategies/google.strategy";
import { AuthGoogleController } from "../../application/controllers/authgoogle.controller";
import { PassportModule } from "@nestjs/passport";
import { AuthGoogleService } from "../../domain/services/authgoogle.service";
import { GoogleProvider } from "../providers/google.provider";
import { UserService } from "src/domain/services/user.service";
import { PrismaService } from "src/domain/services/prisma.service";
import { AuthService } from "src/domain/services/auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { SecurityConfig } from "src/common/constants/configs/config.interface";
import { PrismaModule } from "nestjs-prisma";
import { EmailService } from "src/domain/services/email.service";
import { EmailModule } from "./email.module";
import { KeyService } from "src/domain/services/key.service";

@Module({
  imports: [
    PrismaModule,
    EmailModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>("security");
        return {
          secret: configService.get<string>("JWT_SECRET"),
          signOptions: {
            expiresIn: securityConfig.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthGoogleController],
  providers: [
    AuthGoogleService,
    GoogleStrategy,
    GoogleProvider,
    UserService,
    AuthService,
    JwtService,
    PrismaService,
    EmailService,
    KeyService,
  ],
})
export class AuthGoogleModule {}
