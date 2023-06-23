import { Module } from "@nestjs/common";
import { DemoController } from "../../application/controllers/demo.controller";
import { DemoService } from "../../domain/services/demo.service";
import { AppService } from "../../domain/services/app.service";

@Module({
  imports: [],
  controllers: [DemoController],
  providers: [AppService, DemoService],
})
export class AppModule {}
