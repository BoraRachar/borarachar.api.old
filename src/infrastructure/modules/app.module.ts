import { PrismaModule } from "nestjs-prisma";
import { Module } from "@nestjs/common";
import { DemoController } from "../../application/controllers/demo.controller";
import { DemoService } from "../../domain/services/demo.service";
import { AppService } from "../../domain/services/app.service";
import { PrismaConfigService } from "../database/config/PrismaConfigService";

@Module({
  imports: [
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: PrismaConfigService,
    }),
  ],
  controllers: [DemoController],
  providers: [AppService, DemoService],
})
export class AppModule {}
