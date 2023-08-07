import { Module } from "@nestjs/common";
import { AuthService } from "../../domain/services/auth.service";
import { LocalStrategy } from "../../domain/core/auth/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "../../application/controllers/auth.controller";
import { PrismaModule } from "nestjs-prisma";
import { PrismaService } from "../../domain/services/prisma.service";
import "dotenv/config";
import { ConfigService } from "@nestjs/config";
import { SecurityConfig } from "src/common/constants/configs/config.interface";
import { UserController } from "src/application/controllers/user.controller";
import { UserService } from "src/domain/services/user.service";
import { KeyService } from "src/domain/services/key.service";

@Module({
  imports: [
    PrismaModule,
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
  controllers: [AuthController, UserController],
  providers: [
    AuthService,
    LocalStrategy,
    PrismaService,
    UserService,
    KeyService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
