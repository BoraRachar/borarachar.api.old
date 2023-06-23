import { AppController } from "../../application/controllers/app.controller";
import { AppService } from "../../domain/services/app.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
