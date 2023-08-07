import { AppModule } from "./infrastructure/modules/app.module";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import { NestApplicationOptions, ValidationPipe } from "@nestjs/common";
import "dotenv/config";
import { ExpressAdapter } from "@nestjs/platform-express";
import * as http from "http";
import express from "express";
import { Logger } from "./common/helper/logger";
import { ConfigService } from "./domain/services/config.service";
import { createDocument } from "./common/helper/swagger";

const NEST_LOGGING = false;
async function bootstrap() {
  const opts: NestApplicationOptions = {};
  if (!NEST_LOGGING) {
    opts.logger = false;
  }

  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  const configService = app.get(ConfigService);

  SwaggerModule.setup("/v1", app, createDocument(app));

  app.useLogger(app.get(Logger));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix("v1");

  await app.init();
  http.createServer(server).listen(configService.get().port || 3000, "0.0.0.0");
}
bootstrap();
