import { PrismaModule } from "nestjs-prisma";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { DemoController } from "../../application/controllers/demo.controller";
import { DemoService } from "../../domain/services/demo.service";
import { AppService } from "../../domain/services/app.service";
import { PrismaConfigService } from "../database/config/PrismaConfigService";
import { getEnvPath } from "src/common/helper/env.helper";
import { AuthGoogleModule } from "./authgoogle.module";
import { AuthInstagramModule } from "./auth-instagram.module";

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: PrismaConfigService,
    }),
    AuthGoogleModule,
    AuthInstagramModule,
  ],
  controllers: [DemoController],
  providers: [AppService, DemoService],
})
export class AppModule {}
