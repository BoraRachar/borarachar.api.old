import { AppModule } from "./infrastructure/modules/app.module";
import { NestFactory } from "@nestjs/core";
import type { SwaggerDocumentOptions } from "@nestjs/swagger";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

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

  await app.listen(3000);
}
bootstrap();
