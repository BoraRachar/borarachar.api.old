import { SWAGGER_CONFIG } from "../constants/swagger.default";
import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";

export function createDocument(app: INestApplication): OpenAPIObject {
  const builder = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.title)
    .setDescription(SWAGGER_CONFIG.description)
    .addBearerAuth(
      { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      "access-token",
    )
    .setVersion(SWAGGER_CONFIG.version);
  const options = builder.build();

  return SwaggerModule.createDocument(app, options);
}
