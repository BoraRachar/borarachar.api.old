import { Injectable } from "@nestjs/common";
import { PrismaOptionsFactory, PrismaServiceOptions } from "nestjs-prisma";

@Injectable()
export class PrismaConfigService implements PrismaOptionsFactory {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  createPrismaOptions(): PrismaServiceOptions | Promise<PrismaServiceOptions> {
    return {
      prismaOptions: {
        log: ["query", "info"],
      },
      explicitConnect: true,
      middlewares: [],
    };
  }
}
