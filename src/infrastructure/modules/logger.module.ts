import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { LoggerMiddleware } from "../../application/middlewares/logger.middleware";
import { Logger } from "../../common/helper/logger";
import { ConfigModule } from "./config.module";

@Module({
  imports: [ConfigModule],
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
