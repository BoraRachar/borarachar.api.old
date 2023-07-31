import { PrismaModule } from "nestjs-prisma";
import { Module } from "@nestjs/common";
import { AppService } from "../../domain/services/app.service";
import { PrismaConfigService } from "../database/config/PrismaConfigService";
import { AuthModule } from "./auth.module";
import { AuthGoogleModule } from "./authgoogle.module";
import { AuthInstagramModule } from "./auth-instagram.module";
import { LoggerModule } from "./logger.module";
import { ConfigModule } from "@nestjs/config";
import config from "src/common/constants/configs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    LoggerModule,
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: PrismaConfigService,
    }),
    AuthModule,
    AuthGoogleModule,
    AuthInstagramModule,
    JwtModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
