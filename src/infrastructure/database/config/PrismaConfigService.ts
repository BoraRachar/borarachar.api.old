import { Injectable } from "@nestjs/common";
import { PrismaOptionsFactory, PrismaServiceOptions } from "nestjs-prisma";
import { loggingMiddleware } from "src/application/middlewares/LoggingMiddleware";

@Injectable()
export class PrismaConfigService implements PrismaOptionsFactory {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  createPrismaOptions(): PrismaServiceOptions | Promise<PrismaServiceOptions> {
    return {
      prismaOptions: {
        log: ["info", "query"],
      },
      explicitConnect: true,
      middlewares: [loggingMiddleware()],
    };
  }
}
