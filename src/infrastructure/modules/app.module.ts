import { PrismaModule } from "nestjs-prisma";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { DemoController } from "../../application/controllers/demo.controller";
import { DemoService } from "../../domain/services/demo.service";
import { AppService } from "../../domain/services/app.service";
import { PrismaConfigService } from "../database/config/PrismaConfigService";
import { AuthModule } from "./auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: PrismaConfigService,
    }),
    AuthModule,
  ],
  controllers: [DemoController],
  providers: [AppService, DemoService],
})
export class AppModule {}
