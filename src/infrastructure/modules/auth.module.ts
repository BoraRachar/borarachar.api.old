import { Module } from "@nestjs/common";
import { SocialStrategy } from "../../domain/core/auth/social.strategy";
import { AuthService } from "src/domain/services/auth.service";
import { LocalStrategy } from "src/domain/core/auth/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "src/application/controllers/auth.controller";
import { PrismaModule } from "nestjs-prisma";
import { PrismaService } from "../../domain/services/prisma.service";
import "dotenv/config";

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "2h" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, PrismaService],
})
export class AuthModule {}
