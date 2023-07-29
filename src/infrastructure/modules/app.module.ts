import { PrismaModule } from "nestjs-prisma";
import { Module } from "@nestjs/common";
import { DemoController } from "../../application/controllers/demo.controller";
import { DemoService } from "../../domain/services/demo.service";
import { AppService } from "../../domain/services/app.service";
import { PrismaConfigService } from "../database/config/PrismaConfigService";
import { AuthModule } from "./auth.module";
import { AuthGoogleModule } from "./authgoogle.module";
import { AuthInstagramModule } from "./auth-instagram.module";
import { LoggerModule } from "./logger.module";
import { ConfigModule } from "./config.module";

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: PrismaConfigService,
    }),
    AuthModule,
    AuthGoogleModule,
    AuthInstagramModule,
  ],
  controllers: [DemoController],
  providers: [AppService, DemoService],
})
export class AppModule {}
