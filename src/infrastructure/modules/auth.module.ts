import { Module } from "@nestjs/common";
import { AuthService } from "../../domain/services/auth.service";
import { LocalStrategy } from "../../domain/core/auth/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "../../application/controllers/auth.controller";
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
