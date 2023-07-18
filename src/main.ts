import { AppModule } from "./infrastructure/modules/app.module";
import { NestFactory } from "@nestjs/core";
import type { SwaggerDocumentOptions } from "@nestjs/swagger";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import "dotenv/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(`Bora Rachar`)
    .setDescription(`API`)
    .setVersion(`v1`)
    .build();

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup("api", app, document);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
