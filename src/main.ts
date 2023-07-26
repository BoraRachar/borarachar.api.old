import { AppModule } from "./infrastructure/modules/app.module";
import { NestFactory } from "@nestjs/core";
import type { SwaggerDocumentOptions } from "@nestjs/swagger";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestApplicationOptions, ValidationPipe } from "@nestjs/common";
import "dotenv/config";
import * as fs from "fs";
import { ExpressAdapter } from "@nestjs/platform-express";
import * as http from "http";
import * as https from "https";
import * as express from "express";
import { Logger } from "./common/helper/logger";
import { ConfigService } from "./domain/services/config.service";
import { createDocument } from "./common/helper/swagger";

const NEST_LOGGING = false;
async function bootstrap() {
  const opts: NestApplicationOptions = {};
  if (!NEST_LOGGING) {
    opts.logger = false;
  }
  const privateKey = fs.readFileSync(
    "./src/infrastructure/secrets/privatekey.pem",
    "utf8",
  );
  const certificate = fs.readFileSync(
    "./src/infrastructure/secrets/certificate.pem",
    "utf8",
  );

  const httpsOptions = { key: privateKey, cert: certificate };

  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  const configService = app.get(ConfigService);

  SwaggerModule.setup("api", app, createDocument(app));

  app.useLogger(app.get(Logger));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.init();
  http.createServer(server).listen(configService.get().port || 3000);
  https
    .createServer(httpsOptions, server)
    .listen(configService.get().portssl || 3001);
}
bootstrap();
