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
import { ConfigService } from "@nestjs/config";
import { BullModule } from "@nestjs/bull";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";

@Module({
  imports: [
    PrometheusModule.register({
      path: "/metrics",
    }),
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>("REDIS_HOST"),
          port: configService.get<number>("REDIS_PORT"),
          keyPrefix: configService.get<string>("REDIS_PREFIX"),
          password: configService.get<string>("REDIS_PASS"),
        },
      }),
      inject: [ConfigService],
    }),
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
